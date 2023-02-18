/* eslint-disable react-hooks/exhaustive-deps */
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Code,
} from '@chakra-ui/react';
import { CancelledError, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import useWeb3Store from '../../utils/web3store';
import { ethers } from 'ethers';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const abi = ethers.utils.defaultAbiCoder;

export const LandConfirmModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  data: any;
}> = ({ isOpen, onClose, data }) => {
  const [hash, setHash] = useState<string>();
  const toast = useToast();
  const contract = useWeb3Store((state) => state.contract);
  const mutation = useMutation(async () => {
    const txn = await contract?.addLand(
      ['3.456456', '3453.45345', '345.4533', '3453.4353'],
      data.area,
      data.address,
      data.price,
      data.pid,
      data.survey,
      data["land type"],
      // {
      //   gasLimit: 6000000
      // }
    );
    console.log('Adding Land ....');
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
        description: 'An error occured while adding land',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
    if (mutation.isSuccess) {
      toast({
        title: 'Land Added',
        description: `Land addition successful ${hash?.slice(0, 10)}`,
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
          <ModalHeader>Confirm Adding Land</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Add Land with the following details
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
              loadingText="Adding Land"
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
