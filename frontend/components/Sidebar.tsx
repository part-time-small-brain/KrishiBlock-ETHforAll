import {
	Avatar,
	Button,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	Text,
	VStack,
	Link as ChakraLink,
	useColorMode,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import RoleLinks from "../utils/links";
import useWeb3Store from "../utils/web3store";
import useUserStore from "../utils/store";

const Sidebar: FC = () => {
	const [connectedAccount, isConnected] = useWeb3Store((state) => [
		state.connectedAccount,
		state.isConnected,
	]);
	const userType = useUserStore((state) => state.userType);
	return (
		<VStack w="full" pt={8} spacing={4} pos={"sticky"} top={0}>
			{RoleLinks.get(userType || "4")!.map((val, i) => (
				<Link
					style={{
						width: "100%",
						marginRight: 32,
						marginBottom:
							i === RoleLinks.get(userType || "4")!.length - 1
								? "auto"
								: "none",
					}}
					href={val.href}
					key={i}
				>
					<Button
						w={"full"}
						colorScheme={"yellow"}
						borderStart={"none"}
						borderLeftRadius="none"
						borderRightRadius={"full"}
						height={12}
						textTransform={"capitalize"}
					>
						{val.name}
					</Button>
				</Link>
			))}
			<Popover>
				<PopoverTrigger>
					<Stack
						cursor={"pointer"}
						position={"fixed"}
						bottom="0"
						left={0}
						gap={4}
						direction={"row"}
						p={8}
						alignItems={"center"}
						justify={"start"}
					>
						<Avatar src="https://source.boringavatars.com/" />
						<VStack
							h="full"
							alignItems={"start"}
							justifyContent={"center"}
							lineHeight={0}
							gap={2}
						>
							{isConnected ? (
								<>
									<Text>{connectedAccount?.slice(0, 10)}</Text>
									<Text fontSize={"sm"}>user</Text>
								</>
							) : (
								<Text>Connect Wallet</Text>
							)}
						</VStack>
					</Stack>
				</PopoverTrigger>
				<PopoverContent mx={4}>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader>Yeah! That&apos;s your wallet address</PopoverHeader>
					<PopoverBody>
						<ChakraLink
							href="https://metamask.zendesk.com/hc/en-us/articles/360059535551-Disconnect-wallet-from-a-dapp"
							isExternal
							color={"yellow.600"}
						>
							How to disconnect?
						</ChakraLink>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</VStack>
	);
};

export default Sidebar;
