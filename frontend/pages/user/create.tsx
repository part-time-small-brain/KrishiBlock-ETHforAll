import { Box, Button, useDisclosure, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, UserConfirmModal } from '../../components/Form';

const Auth: NextPage = () => {
  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onClose: confirmOnClose,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState<any>();
  return (
    <Box p={4}>
      <VStack spacing={4} maxW="container.md">
        <FormField name="name" errorsObj={errors.name} register={register} />
        <FormField name="age" errorsObj={errors.age} register={register} />
        <FormField name="city" errorsObj={errors.city} register={register} />
        <FormField name="aadhar" errorsObj={errors.aadhar} register={register} />
        <FormField name="pan" errorsObj={errors.pan} register={register} />
        <FormField
          name="document"
          errorsObj={errors.name}
          register={register}
        />
        <FormField
          name="email"
          inputProps={{ type: "email" }}
          errorsObj={errors.name}
          register={register}
        />

        <Button
          onClick={handleSubmit((formData) => {
            setData(formData);
            confirmOnOpen();
          })}
          colorScheme={"yellow"}
          minW="48"
        >
          Add
        </Button>
      </VStack>
      <UserConfirmModal
        isOpen={confirmIsOpen}
        onClose={confirmOnClose}
        data={data}
      />
    </Box>
  );
};

export default Auth;
