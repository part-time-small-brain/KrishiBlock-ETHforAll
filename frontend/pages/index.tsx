import {
  Button,
  ButtonProps,
  Grid,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserModal, AdminModal } from '../components/Home';
import useUserStore from '../utils/store';
import useWeb3Store from '../utils/web3store';
import shallow from 'zustand/shallow';
import KrishiHeading from '../components/Heading';
import RoleLinks from '../utils/links';

const props: ButtonProps = {
  width: '100px',
  colorScheme: 'yellow',
  rounded: 'xl',
};

const Home: NextPage = () => {
  const [isConnected] = useWeb3Store((state) => [state.isConnected], shallow);
  const [userType, setUserType] = useUserStore(
    (state) => [state.userType, state.setUserType],
    shallow
  );
  const router = useRouter();

  const {
    isOpen: adminIsOpen,
    onOpen: adminOnOpen,
    onClose: adminOnClose,
  } = useDisclosure();
  const {
    isOpen: userIsOpen,
    onOpen: userOnOpen,
    onClose: userOnClose,
  } = useDisclosure();

  return (
    <Grid height={'100vh'} placeItems="center">
      <VStack gap={4}>
        <KrishiHeading sq={'64px'} textSize={'7xl'} />
        {!isConnected ? (
          <HStack>
            <Button {...props} onClick={adminOnOpen}>
              Admin
            </Button>
            <Button
              {...props}
              onClick={() => {
                setUserType('4');
                userOnOpen();
              }}
            >
              User
            </Button>
          </HStack>
        ) : (
          <Button
            colorScheme={'yellow'}
            onClick={() =>
              router.push(RoleLinks.get(userType as any)?.at(0)?.href as string)
            }
          >
            Go to your Dashboard
          </Button>
        )}
      </VStack>
      <AdminModal onClose={adminOnClose} isOpen={adminIsOpen} />
      <UserModal onClose={userOnClose} isOpen={userIsOpen} />
    </Grid>
  );
};
export default Home;
