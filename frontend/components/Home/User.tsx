/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import useUserStore from '../../utils/store';
import { ConnectWallet } from './ConnectWallet';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal: FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const setUserType = useUserStore((state) => state.setUserType);
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Oh Hellow User 👋</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Just click on the connect wallet button
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onClose}
              rounded="full"
              variant={'outline'}
            >
              Close
            </Button>
            <ConnectWallet disabled={false} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
