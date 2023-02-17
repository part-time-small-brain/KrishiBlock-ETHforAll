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
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { ConnectWallet } from "./ConnectWallet";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sooo you&apos;re an admin 🤔</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">choose your role</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row" gap="3">
                <Radio value="1">Lekhpal</Radio>
                <Radio value="2">Tehsildar</Radio>
                <Radio value="3">SDM</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <ConnectWallet disabled={typeof value === "undefined"} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
