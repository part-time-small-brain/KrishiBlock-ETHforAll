import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import shallow from "zustand/shallow";
import useWeb3Store from "../../../utils/web3store";

const AllLandInspectors: NextPage = () => {
    const query = useQuery(["tehsildar"], () => {
        
    });
  const [contract, connectedAccount, balance] = useWeb3Store(
    (state) => [state.contract, state.connectedAccount, state.balance],
    shallow
  );
    return (
        <>
            All Tehsildars
        </>
    )
}

export default AllLandInspectors