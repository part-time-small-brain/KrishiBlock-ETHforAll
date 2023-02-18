import {
  Button,
  Code,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { FC, useEffect, useState } from 'react';

import useWeb3Store from '../../utils/web3store';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const abi = ethers.utils.defaultAbiCoder;

export const TransferConfirmModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  data: any;
}> = ({ isOpen, onClose, data }) => {
  const [hash, setHash] = useState<string>();
  const toast = useToast();
  const contract = useWeb3Store((state) => state.contract);
  const mutation = useMutation(async () => {
    const txn = await contract?.transferOwnership(
      data.to,
      data.from,
      data.id,
      {
        gasLimit: 16871406
      }
    );
    console.log('Transfering Ownership ....');
    await txn.wait();
    setHash(txn.hash);
  });
  const confirmHandler = () => {
    mutation.mutate();
  };
  useEffect(() => {
    if (mutation.isError) {
      toast({
        title: 'Error',
        description: 'An error occured while transferring ownership',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
    if (mutation.isSuccess) {
      toast({
        title: 'Ownership Transferred',
        description: `successful ${hash?.slice(0, 15)}...`,
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
      onClose();
    }
  }, [mutation.isSuccess, mutation.isError, hash]);
  return (
    <>
      <Modal isOpen={isOpen} colorScheme="yellow" onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Confirm Ownership Transfer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Transfer Ownership with the following details
            <Code
              p={4}
              rounded="xl"
              mt={2}
              variant="outline"
              colorScheme={'yellow'}
            >
              {JSON.stringify(data, null, 8)}
            </Code>
          </ModalBody>
          <ModalFooter>
            <Button
              variant={'outline'}
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              Go Back
            </Button>
            <Button
              colorScheme={'green'}
              onClick={confirmHandler}
              loadingText="Transferring Ownership"
              isLoading={mutation.isLoading}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
