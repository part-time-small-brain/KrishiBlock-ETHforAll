/* eslint-disable react-hooks/exhaustive-deps */
import type { AppProps } from 'next/app';
import { ChakraProvider, Text, useDisclosure, useToast } from '@chakra-ui/react';
import theme from '../theme';
import Layout from '../components/Layout';
import '@fontsource/josefin-sans';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useMetaMask from '../utils/hooks/useMetaMask';
import useWeb3 from '../utils/hooks/useWeb3';
import useWeb3Store from '../utils/web3store';
import useUserStore from '../utils/store';
import shallow from 'zustand/shallow';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RoleLinks from '../utils/links';
import Head from 'next/head';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
}

function MyApp({ Component, pageProps }: AppProps) {
  useMetaMask();
  useWeb3();
  const router = useRouter();
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [isConnected, connectedAccount, contract] = useWeb3Store(
    (state) => [state.isConnected, state.connectedAccount, state.contract],
    shallow
  );
  const [userType, setUserType, setPermissionMismatch, permissionMismatch] =
    useUserStore(
      (state) => [
        state.userType,
        state.setUserType,
        state.setPermissionMismatch,
        state.permissionMismatch,
      ],
      shallow
    );

  useEffect(() => {
    const localUserType = localStorage.getItem('userType') as usertype;
    if (localUserType) {
      setUserType(localUserType);
    }
  }, []);

  const toast = useToast();

  const checkFunctions = (inp: '1' | '2' | '3' | '4' | undefined) => {
    switch (inp) {
      case '3':
        return contract?.isSDM;
      case '2':
        return contract?.isTehsildar;
      case '1':
        return contract?.isLekhpal;
      default:
        throw new Error('No User Type');
    }
  };

  const checkUserType = async () => {
    console.log('checking user type', {
      userType,
      isConnected,
      contract,
    });
    try {
        if (userType === '4') {
          const isRegistered = await contract?.isUserRegistered(connectedAccount);
          if (!isRegistered) {
            toast({
              title: 'user profile not found',
              description: 'redirecting you to the profile creation page',
              status: 'success',
              duration: 1000,
            });
            router.push('/user/create');
          } else {
            toast({
              title: 'user profile found',
              description: 'You can move to your dashboard now',
              status: 'success',
              duration: 1000,
            });
            router.push('/user/');
          }
        } else {
          const isUserType = await checkFunctions(userType)(connectedAccount);
          if (!isUserType) {
            setPermissionMismatch(true);

            router.push('/error');
            toast({
              title: `not user of type ${userType}`,
              description: 'redirecting you to the error page',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: `user of type ${userType}, verified`,
              description: 'You can move to your dashboard now',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            router.push(RoleLinks.get(userType as any)?.at(0)?.href as string);
          }
        }
    } catch (e) {
      toast({
        title: 'error',
        description: 'Problem verifying you',
        status: 'error',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (!!contract && isConnected && userType !== undefined) {
      checkUserType();
    }
  }, [isConnected, userType, contract]);

  // working --------------------------

  useEffect(() => {
    if (!isConnected && router.pathname !== '/error') router.push('/');
  }, [isConnected]);

  useEffect(() => {
    if (router.pathname !== '/' && router.pathname !== '/error') setIsDashboard(true);
    else setIsDashboard(false);
  }, [router.pathname]);

  // working --------------------------

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Krishi Block</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍🌾</text></svg>"
        />
      </Head>
      <ChakraProvider theme={theme}>
        {!isDashboard ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
