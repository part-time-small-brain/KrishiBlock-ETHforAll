import React, { useState, useEffect, useCallback } from "react";

const useMetaMask = () => {
  const [isInstalledWallet, setIsInstalledWallet] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

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
      (window.ethereum as any).on(
        "accountsChanged",
        function (accounts: string[]) {
          if (accounts && accounts.length) {
            setConnectedAccount(accounts[0]);
            setIsConnected(true);
          } else {
            setConnectedAccount(null);
            setIsConnected(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const onChangeChain = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      (window.ethereum as any).on("chainChanged", function (_chainId: string) {
        console.log("chainChanged:", parseInt(_chainId));
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      const accounts = await (window.ethereum as any).request({
        method: "eth_accounts",
      });
      if (accounts && accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        setConnectedAccount(null);
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      const accounts = await (window.ethereum as any).request({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts.length) {
        setConnectedAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsInstalled();
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
    onChangeAccounts();
    onChangeChain();
  }, [isInstalledWallet]);

  return {
    isInstalledWallet,
    isConnected,
    connectedAccount,
    checkIfWalletIsInstalled,
    checkIfWalletIsConnected,
    connectWallet,
  };
};

export default useMetaMask;
