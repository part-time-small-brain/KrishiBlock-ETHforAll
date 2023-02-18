import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractAddress } from '../constants';
import abi from '../abi.json';
import useWeb3Store from '../web3store';
import shallow from 'zustand/shallow';

const useWeb3 = () => {
  const connectedAccount = useWeb3Store((state) => state.connectedAccount);
  const [setBalance] = useWeb3Store(state => [state.setBalance], shallow);
  const [provider, setProvider] = useState<any>(null);
  const [setContract] = useWeb3Store(state => [state.setContract], shallow);

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
};

export default useWeb3;
