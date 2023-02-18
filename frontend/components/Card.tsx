import { VStack, Flex, Button, Text } from "@chakra-ui/react";
import { FC } from "react";

const Card: FC<{ land: landType } & { openModal: (x: landType) => void }> = ({
	land,
	openModal,
}) => {
	if (land)
		return (
			<VStack w={"80"} minH={"48"} p={4} py={8} rounded="xl">
				<Flex display={"inline-flex"} alignItems="center" gap={2}>
					<Text fontSize={"7xl"}>{JSON.parse(land.id as any)}</Text>
					<Text fontSize={"xl"}>{JSON.parse(land.area as any)} Sq.Ft</Text>
				</Flex>
				<Text textTransform={"capitalize"}>{land.address}</Text>
				<Button
					variant={"solid"}
					w="full"
					onClick={() =>
						openModal({
							area: JSON.parse(land.area as any),
							address: land.address,
							id: JSON.parse(land.id as any),
							isLandVerified: land.isLandVerified,
							ownerAddress: land.ownerAddress,
						})
					}
				>
					View Details
				</Button>
			</VStack>
		);
	return null;
};

export default Card;
