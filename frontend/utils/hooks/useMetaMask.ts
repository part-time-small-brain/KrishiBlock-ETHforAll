import { useState, useEffect, useCallback } from 'react';
import useUserStore from '../store';
import useWeb3Store from '../web3store';

const useMetaMask = () => {
  const setPermissionMismatch = useUserStore(state => state.setPermissionMismatch);
  const isInstalledWallet = useWeb3Store(state => state.isInstalledWallet);
  const setConnectedAccount = useWeb3Store(state => state.setConnectedAccount);
  const setIsInstalledWallet = useWeb3Store(state => state.setIsInstalledWallet);
  const setIsConnected = useWeb3Store(state => state.setIsConnected);

  const checkIfWalletIsInstalled = async () => {
    let flag: boolean = true;
    if (!window.ethereum) {
      flag = false;
    }
    setIsInstalledWallet(flag);
    return flag;
  };

  const onChangeAccounts = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      window.ethereum.on('accountsChanged', function (accounts: string[]) {
        if (accounts?.length) {
          setConnectedAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setConnectedAccount(null);
          setIsConnected(false);
          setPermissionMismatch(false);
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  const onChangeChain = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      window.ethereum.on('chainChanged', function (_chainId: string) {
        console.log('chainChanged:', parseInt(_chainId));
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (accounts?.length) {
        setConnectedAccount(accounts[0]);
        setIsConnected(true);
      } else {
        setConnectedAccount(null);
        setIsConnected(false);
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  useEffect(() => {
    checkIfWalletIsInstalled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
    onChangeAccounts();
    onChangeChain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstalledWallet]);
};

export default useMetaMask;
