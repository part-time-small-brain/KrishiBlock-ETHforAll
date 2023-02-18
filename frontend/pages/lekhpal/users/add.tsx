import { NextPage } from 'next';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
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
} from '@chakra-ui/react';
import { FC, HTMLInputTypeAttribute } from 'react';

const AddLandInspector: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box p={4}>
      <VStack as={'form'} spacing={4} maxW="container.md">
        <FormField
          name="Address"
          placeholder="Enter land owner's address"
          isRequired
        />
        <FormField name="Name" placeholder="Enter name" isRequired />
        <FormField
          name="Age"
          placeholder="Enter age"
          type={'number'}
          isRequired
        />
        <FormField
          name="Designation"
          placeholder="Enter designation"
          isRequired
        />
        <FormField name="City" placeholder="Enter city name" isRequired />
        <Button
          onClick={(e) => {
            e.preventDefault();
            onOpen();
          }}
          colorScheme={'yellow'}
          minW="48"
        >
          Add
        </Button>
      </VStack>

      <Modal isOpen={isOpen} colorScheme="yellow" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Adding Land Owner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Add land owner with the following details</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Go Back
            </Button>
            <Button variant="ghost">Continue</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
        <FormLabel fontWeight={'bold'}>{name}</FormLabel>
        <Input
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
        />
      </FormControl>
    </>
  );
};

export default AddLandInspector;
