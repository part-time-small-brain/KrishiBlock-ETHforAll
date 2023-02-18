import { Box, Button, useDisclosure, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, TransferConfirmModal } from '../../components/Form';

const TransferOwnership: NextPage = () => {
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
      <VStack spacing={4} maxW="container.md" fontSize={'sm'}>
        <FormField
          name="from"
          inputProps={{ placeholder: 'From Address' }}
          errorsObj={errors.from}
          register={register}
        />
        <FormField
          name="to"
          inputProps={{ placeholder: 'To Address' }}
          errorsObj={errors.to}
          register={register}
        />
        <FormField
          name="id"
          inputProps={{ type: 'number', placeholder: 'ID' }}
          errorsObj={errors.id}
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
          Transfer
        </Button>
      </VStack>
      <TransferConfirmModal
        isOpen={confirmIsOpen}
        onClose={confirmOnClose}
        data={data}
      />
    </Box>
  );
};

export default TransferOwnership;
