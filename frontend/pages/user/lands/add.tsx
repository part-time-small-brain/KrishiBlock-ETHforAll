import { NextPage } from "next";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Grid,
  Box,
  FormControlProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { FC, HTMLInputTypeAttribute } from "react";
import DrawLand from "../../../components/DrawLand";

const AddLand: NextPage = () => {
  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onClose: confirmOnClose,
  } = useDisclosure();
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  return (
    <Box p={4}>
      <VStack as={"form"} spacing={4} maxW="container.md">
        <FormField
          name="Area"
          placeholder="Enter the land area in sq.ft"
          isRequired
          type={"number"}
        />
        <FormField
          name="Address"
          placeholder="Enter the land address"
          isRequired
        />
        <FormField
          name="Price"
          placeholder="Enter the land price"
          type={"number"}
          isRequired
        />
        <FormField name="PID" placeholder="Enter land's PID" isRequired />
        <FormField name="survey" placeholder="Enter survey number" isRequired />
        <HStack gap={4}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              drawerOnOpen();
            }}
            colorScheme={"purple"}
            minW="48"
          >
            Draw Land
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              confirmOnOpen();
            }}
            colorScheme={"yellow"}
            minW="48"
          >
            Add
          </Button>
        </HStack>
      </VStack>

      <Modal
        isOpen={confirmIsOpen}
        colorScheme="yellow"
        onClose={confirmOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Adding Land Owner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Add land owner with the following details</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmOnClose}>
              Go Back
            </Button>
            <Button variant="ghost">Continue</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DrawLand isOpen={drawerIsOpen} onClose={drawerOnClose} />
    </Box>
  );
};

interface FormFieldProps {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  isRequired?: boolean;
  type?: HTMLInputTypeAttribute;
  props?: FormControlProps;
}

const FormField: FC<FormFieldProps> = ({
  name,
  defaultValue,
  placeholder,
  isRequired,
  type,
  props,
}) => {
  return (
    <>
      <FormControl isRequired={isRequired} {...props}>
        <FormLabel textTransform={"capitalize"} fontWeight={"bold"}>
          {name}
        </FormLabel>
        <Input
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
        />
      </FormControl>
    </>
  );
};

export default AddLand;
