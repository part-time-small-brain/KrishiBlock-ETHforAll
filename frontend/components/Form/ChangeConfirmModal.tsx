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
import useUserStore from '../../utils/store';

import useWeb3Store from '../../utils/web3store';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const abi = ethers.utils.defaultAbiCoder;

export const ChangeConfirmModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  data: any;
}> = ({ isOpen, onClose, data }) => {
  const [hash, setHash] = useState<string>();
  const toast = useToast();
  const contract = useWeb3Store(state => state.contract);
  const setPermissionMismatch = useUserStore(state => state.setPermissionMismatch);
  const mutation = useMutation(async () => {
    const txn = await contract?.changeSDM(data.address);
    console.log('Changing SDM ....');
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
        description: 'An error occured while changing SDM',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
    if (mutation.isSuccess) {
      toast({
        title: 'SDM Changed',
        description: `successful ${hash?.slice(0, 15)}...`,
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
      onClose();
      setPermissionMismatch(true);
    }
  }, [mutation.isSuccess, mutation.isError, hash]);
  return (
    <>
      <Modal isOpen={isOpen} colorScheme="yellow" onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Change SDM</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Change SDM with the following details
            <Code p={4} rounded="xl" mt={2} variant="outline" colorScheme={'yellow'}>
              {JSON.stringify(data, null, 8)}
            </Code>
          </ModalBody>
          <ModalFooter>
            <Button variant={'outline'} colorScheme="red" mr={3} onClick={onClose}>
              Go Back
            </Button>
            <Button
              colorScheme={'green'}
              onClick={confirmHandler}
              loadingText="Changing SDM"
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
