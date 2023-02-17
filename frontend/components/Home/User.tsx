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
import { FC } from 'react';
import { ConnectWallet } from './ConnectWallet';

interface AdminModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export const UserModal : FC<AdminModalProps> = ({ isOpen, onClose }) => {

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Oh Hellow User 👋</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">Just click on the connect wallet button</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <ConnectWallet disabled={true}/>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
