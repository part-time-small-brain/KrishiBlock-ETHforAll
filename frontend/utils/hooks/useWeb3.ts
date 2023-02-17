import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import useMetaMask from "./useMetaMask";
import { contractAddress } from "../constants";
import abi from "../abi.json";

const useWeb3 = () => {
  const { connectedAccount } = useMetaMask();
  const [balance, setBalance] = useState<string | number>(0);
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(
    null
  );

  const BalanceContract = useCallback(async () => {
    const balance = await provider.getBalance(connectedAccount);
    setBalance(ethers.utils.formatEther(balance));
    const LandContract = new ethers.Contract(
      contractAddress,
      abi,
      provider.getSigner()
    );
    setContract(LandContract);
  }, [connectedAccount, provider]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    setProvider(provider);
  }, []);

  useEffect(() => {
    if (connectedAccount && provider) BalanceContract();
  }, [connectedAccount, provider, BalanceContract]);

  return {
    balance,
    web3Provider: provider,
    contract
  };
};


export default useWeb3