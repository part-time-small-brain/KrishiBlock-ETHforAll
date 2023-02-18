import {
  Box,
  Button,
  HStack,
  Text,
  Toast,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Query, useMutation, useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { FC, useState } from 'react';
import shallow from 'zustand/shallow';
import useWeb3Store from '../../../utils/web3store';

const AllLandInspectors: NextPage = () => {
  const [tehsildars, setTehsildars] = useState<any>([]);
  const [contract, connectedAccount, balance] = useWeb3Store(
    (state) => [state.contract, state.connectedAccount, state.balance],
    shallow
  );
  const query = useQuery(
    ['tehsildar'],
    async () => {
      const tehsildars = await contract?.getTehsildarList();
      return tehsildars;
    },
    {
      onSuccess: (data) => {
        setTehsildars(data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  return (
    <Wrap spacingX={8}>
      {tehsildars.map((tehsildar: any, i: number) => (
        <WrapItem key={i}>
          <TehsilCard address={tehsildar} refetch={() => query.refetch()} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

const TehsilCard: FC<{ address: string; refetch: () => void }> = ({ address, refetch }) => {
  const [tehsildar, setTehsildar] = useState<any>({
    name: 'Tehsildar',
    address: 'some random addresss',
    age: 20,
    tehsil: 'hello',
  });
  const contract = useWeb3Store((state) => state.contract);
  const [activeTehsildar, setActiveTehsildar] = useState<string>();
  const toast = useToast();
  const removeTehsildar = useMutation(
    async () => {
      const tx = await contract?.removeTehsildar(address);
      await tx.wait();
      return tx.hash;
    },
    {
      onSuccess: (data) => {
        toast({
          title: 'Tehsildar Removed',
          description: 'Tehsildar removed successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        refetch();
      },
      onError: (err) => {
        toast({
          title: 'Error',
          description: 'Error removing tehsildar',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );
  const getTehsildar = useQuery(
    ['tehsildar', address],
    async () => {
      const tehsildar = await contract?.tehsildarMapping(address);
      return tehsildar;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setTehsildar(data);
      },
    }
  );
  if (getTehsildar.isLoading || getTehsildar.isInitialLoading) return <Box>Loading {address}</Box>;
  return (
    <Box minH={16} w={'300px'}>
      <HStack>
        <Text textTransform={'capitalize'} fontSize="3xl">
          {tehsildar.name}, {JSON.parse(tehsildar.age)}
        </Text>
      </HStack>
      <VStack alignItems={'start'}>
        <Text fontSize={'sm'}>{tehsildar[0] && tehsildar[0].slice(0, 25)}...</Text>
        <Text fontSize={'lg'} textTransform={'capitalize'}>
          {tehsildar.tehsil}
        </Text>
        <Button w="full" colorScheme={'red'} variant="outline" onClick={() => removeTehsildar.mutate()}>
          remove
        </Button>
      </VStack>
    </Box>
  );
};

export default AllLandInspectors;
