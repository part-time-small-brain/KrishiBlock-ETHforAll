/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import useUserStore from '../../utils/store';
import { ConnectWallet } from './ConnectWallet';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [value, setValue] = useState<usertype | string>('1');
  const [userType, setUserType] = useUserStore(
    (state) => [state.userType, state.setUserType],
    shallow
  );
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
          <ModalHeader>Sooo you&apos;re an admin 🤔</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              choose your role
            </Text>
            <RadioGroup onChange={(val) => setUserType(val as usertype)} value={userType}>
              <Stack direction="row" gap="3">
                <Radio value="1">Lekhpal</Radio>
                <Radio value="2">Tehsildar</Radio>
                <Radio value="3">SDM</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onClose}
              variant="outline"
              rounded={'full'}
            >
              Close
            </Button>
            <ConnectWallet disabled={typeof value === 'undefined'} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
