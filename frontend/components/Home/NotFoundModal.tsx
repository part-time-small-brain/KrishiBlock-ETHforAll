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
import useUserStore from '../../utils/store';
import { ConnectWallet } from './ConnectWallet';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotFoundModal: FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [value, setValue] = useState<usertype | string>('1');
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
          <ModalHeader>Couldn&apos;t find your user type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              disconnect your wallet or choose the role you opted for
            </Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row" gap="3">
                <Radio value="1">Lekhpal</Radio>
                <Radio value="2">Tehsildar</Radio>
                <Radio value="3">SDM</Radio>
                <Radio value="4">User</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              onClick={() => {
                setUserType(value as usertype);
                onClose();
              }}
              rounded={'full'}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
