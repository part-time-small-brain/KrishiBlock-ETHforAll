import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import useWeb3Store from '../../utils/web3store';

export const ConnectWallet: FC<{
  disabled: boolean;
  callback?: (props: any | undefined) => void;
}> = ({ disabled }) => {
  const isConnected = useWeb3Store((state) => state.isConnected);
  const isInstalledWallet = useWeb3Store((state) => state.isInstalledWallet);
  const setConnectedAccount = useWeb3Store(
    (state) => state.setConnectedAccount
  );
  const connectWallet = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      const accounts = await (window.ethereum as any).request({
        method: 'eth_requestAccounts',
      });
      if (accounts && accounts.length) {
        setConnectedAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };
  return (
    <Button
      onClick={connectWallet}
      colorScheme={isConnected ? 'green' : 'yellow'}
      disabled={isConnected || disabled}
      rounded="full"
      leftIcon={
        isConnected ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{
                width: 20,
                height: 20,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              height: '24px',
            }}
          >
            <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
          </svg>
        )
      }
    >
      {isConnected ? 'Connected' : 'Connect Wallet'}
    </Button>
  );
};
