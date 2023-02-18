import { Box, Button, useDisclosure, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, LekhpalConfirmModal } from '../../../components/Form';

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
    <Box>
      <VStack spacing={4} maxW="container.md" fontSize={'sm'}>
        <FormField
          name="address"
          errorsObj={errors.address}
          register={register}
        />
        <FormField
          name="name"
          errorsObj={errors.name}
          register={register}
        />
        <FormField
          name="age"
          inputProps={{ type: 'number' }}
          errorsObj={errors.age}
          register={register}
        />
        <FormField
          name="designation"
          errorsObj={errors.designation}
          register={register}
        />
        <FormField
          name="city"
          errorsObj={errors.city}
          register={register}
        />
          <Button
            onClick={handleSubmit((formData) => {
              setData(formData);
              confirmOnOpen();
            })}
            colorScheme={'yellow'}
            minW="48"
          >
            Add
          </Button>
      </VStack>
      <LekhpalConfirmModal
        isOpen={confirmIsOpen}
        onClose={confirmOnClose}
        data={data}
      />
    </Box>
  );
};

export default Auth;
