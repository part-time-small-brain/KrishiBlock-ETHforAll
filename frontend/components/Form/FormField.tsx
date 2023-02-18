import { InputProps, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { FC } from 'react';

export const FormField: FC<{
  name: string;
  errorsObj: any;
  register: any;
  inputProps?: InputProps;
}> = ({ name, errorsObj, register, inputProps }) => {
  return (
    <FormControl isInvalid={!!errorsObj} isRequired>
      <FormLabel textTransform={'capitalize'} fontWeight="bold">{name}</FormLabel>
      <Input
        {...inputProps}
        {...register(name, {
          required: `${name} is required`,
        })}
      />
      <FormErrorMessage>{errorsObj?.message as string}</FormErrorMessage>
    </FormControl>
  );
};