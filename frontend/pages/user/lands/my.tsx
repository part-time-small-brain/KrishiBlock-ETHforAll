import { useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";

import Card from "../../../components/Card";
import ViewDetail from "../../../components/ViewLand";
import useWeb3Store from "../../../utils/web3store";

const Home: NextPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalLand, setModalLand] = useState<any>({});
	const [lands, setlands] = useState<any[]>([]);
	const [contract, connectedAccount] = useWeb3Store(
		(state) => [state.contract, state.connectedAccount],
		shallow,
	);
	const myLands = useQuery(
		["lands", "my"],
		async () => {
			const lands = await contract?.getlands(connectedAccount);
			return lands;
		},
		{
			onSuccess: (data) => {
				console.log(data);
				setlands(
					data
						.map((land: any) => {
							if (parseInt(JSON.parse(land.area)) === 0) {
								return null;
							}
							return land;
						})
						.filter((land: any) => land != null),
				);
			},
			onError: (err) => {
				console.log(err);
			},
		},
	);
	return (
		<>
			<Wrap>
				{lands.map((land, i) => (
					<WrapItem key={crypto.randomUUID().slice(0, 4)}>
						<Card
							land={land}
							openModal={(land) => {
								setModalLand(land);
								onOpen();
							}}
						/>
					</WrapItem>
				))}
			</Wrap>
			<ViewDetail data={modalLand} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default Home;
