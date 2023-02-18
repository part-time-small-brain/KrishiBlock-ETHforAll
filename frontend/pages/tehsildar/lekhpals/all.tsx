import {
  Box,
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { FC, useState } from 'react';
import shallow from 'zustand/shallow';

import useWeb3Store from '../../../utils/web3store';

const AllLandInspectors: NextPage = () => {
  const [addresses, setAddresses] = useState<Array<string>>([]);
  const [isConnected, connectedAccount, contract] = useWeb3Store(
    (state) => [state.isConnected, state.connectedAccount, state.contract],
    shallow
  );
  const toast = useToast();
  const query = useQuery(
    ['getLekhpal'],
    async () => {
      console.log('tryna query getlekhpal');
      const data = await contract?.getLekhpalList();
      return data;
    },
    {
      onSuccess: (data) => {
        setAddresses(data);
      },
      onError: (err) => {
        toast({
          title: 'Error',
          description: 'Couldn\'t fetch data',
          duration: 1000,
          status: 'error',
          isClosable: true,
        });
      },
    }
  );
  if (query.isLoading) {
    return <Box p={8}>Loading Lekhpals...</Box>;
  }
  return (
    <Wrap spacingX={8}>
      {addresses.map((address, i) => (
        <WrapItem key={i}>
          <Lekh refetch={() => query.refetch()} address={address} />
        </WrapItem>
      ))}
    </Wrap>
  );
};
const Lekh: FC<{ address: string; refetch: () => void }> = ({
  address,
  refetch,
}) => {
  const [lekhpal, setLekhpal] = useState<any>({
    name: 'Tehsildar',
    address: 'some random addresss',
    designation: 'hello',
  });
  const contract = useWeb3Store((state) => state.contract);
  const toast = useToast();
  const removeLekhpal = useMutation(
    async () => {
      const tx = await contract?.removeLekhpal(address);
      await tx.wait();
      return tx.hash;
    },
    {
      onSuccess: (data) => {
        toast({
          title: 'Lekhpal Removed',
          description: 'Lekhpal removed successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        refetch();
      },
      onError: (err) => {
        toast({
          title: 'Error',
          description: 'Error removing Lekhpal',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );
  const getLekhpal = useQuery(
    ['lekhpal', address],
    async () => {
      const tehsildar = await contract?.lekhpalMapping(address);
      return tehsildar;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setLekhpal(data);
      },
    }
  );
  if (getLekhpal.isLoading || getLekhpal.isInitialLoading)
    return <Box>Loading {address}</Box>;
  return (
    <Box minH={16} w={'300px'}>
      <HStack>
        <Text textTransform={'capitalize'} fontSize="3xl">
          {lekhpal.name}
        </Text>
      </HStack>
      <VStack alignItems={'start'}>
        <Text fontSize={'sm'}>{address.slice(0, 25)}...</Text>
        <Text fontSize={'lg'} textTransform={'capitalize'}>
          {lekhpal.designation}
        </Text>
        <Text fontSize={'lg'} textTransform={'capitalize'}>
          {lekhpal.city}
        </Text>
        <Button
          w="full"
          colorScheme={'red'}
          variant="outline"
          onClick={() => removeLekhpal.mutate()}
        >
          remove
        </Button>
      </VStack>
    </Box>
  );
};
export default AllLandInspectors;
