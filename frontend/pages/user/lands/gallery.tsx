import { useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useState } from "react";

import Card from "../../../components/Card";
import ViewDetail from "../../../components/ViewLandAll";
import useWeb3Store from "../../../utils/web3store";

const Gallery: NextPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalLand, setModalLand] = useState<any>({});
	const [lands, setlands] = useState<any[]>([]);
	const contract = useWeb3Store((state) => state.contract);
	useQuery(
		["lands", "gallery"],
		async () => {
			const serverLands = await contract?.paginateLands(6, 1);
			return serverLands;
		},
		{
			onSuccess: (data) => {
				console.log(data);
				setlands(
					data
						.map((land: any) => {
							if (parseInt(JSON.parse(land.area), 10) === 0) {
								return null;
							}
							return land;
						})
						.filter((land: any) => land != null),
				);
			},
		},
	);
	const userMutation = useMutation(
		["user", modalLand?.ownerAddress],
		async () => {
			const userInfo = await contract?.UserMapping(modalLand?.ownerAddress);
			return userInfo;
		},
		{
			onSuccess: (data) => {
				console.log(data);
			},
		},
	);
	return (
		<>
			<Wrap>
				{lands.map((land, i) => (
					<WrapItem key={i}>
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
			{isOpen ? (
				<ViewDetail data={modalLand} isOpen={isOpen} onClose={onClose} />
			) : null}
		</>
	);
};

export default Gallery;
