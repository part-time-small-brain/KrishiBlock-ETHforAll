import {
	Box,
	Button,
	Code,
	HStack,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { FC, useState } from "react";
import useDecrypt from "../../../utils/hooks/useDecrypt";

import useWeb3Store from "../../../utils/web3store";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const VerifyUser: NextPage = () => {
	const { onOpen, isOpen, onClose } = useDisclosure();
	const [users, setUsers] = useState<Array<any>>([]);
	const [activeAddress, setActiveAddress] = useState<string>();
	const [emptyList, setEmptyList] = useState<boolean>(false);
	const contract = useWeb3Store((state) => state.contract);
	const toast = useToast();
	const query = useQuery(
		["getUnverifiedUsers"],
		async () => {
			const unverifiedUsers = await contract?.getUnverifiedUsers();
			return unverifiedUsers as Array<any>;
		},
		{
			onSuccess: (data) => {
				if (data[0] === "0x0000000000000000000000000000000000000000")
					setEmptyList(true);
				setUsers(
					data.filter((user) => {
						return user !== "0x0000000000000000000000000000000000000000";
					}),
				);
			},
			onError: (err) => {
				toast({
					title: "Error",
					description: "Couldn't fetch data",
					duration: 1000,
					status: "error",
					isClosable: true,
				});
			},
		},
	);
	if (query.isLoading) {
		return <Box p={8}>Loading Unverified Users...</Box>;
	}
	if (emptyList) return <Box p={8}>No Unverified Users :)</Box>;
	return (
		<Box p={8}>
			<TableContainer>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>Address</Th>
							<Th>Verify</Th>
						</Tr>
					</Thead>
					<Tbody>
						{users.map((address, i) => {
							return (
								<Tr key={i}>
									<Td>{i + 1}</Td>
									<Td>{address}</Td>
									<Td>
										<HStack>
											<IconButton
												colorScheme="green"
												aria-label="Accept"
												onClick={() => {
													setActiveAddress(address);
													onOpen();
												}}
												icon={
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
												}
											/>
										</HStack>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>#</Th>
							<Th>Address</Th>
							<Th>Verify</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
			<VerifyUserModal
				address={activeAddress}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</Box>
	);
};

export const VerifyUserModal: FC<{
	isOpen: boolean;
	onClose: () => void;
	address: string | undefined;
}> = ({ isOpen, onClose, address }) => {
	const toast = useToast();
	const contract = useWeb3Store((state) => state.contract);
	const queryClient = useQueryClient();
	const [user, setUser] = useState<any>(null);
	const { isLoading } = useQuery(
		["user", address],
		async () => {
			const user = await contract?.UserMapping(address);
			return user;
		},
		{
			onSuccess: (data) => {
				console.log("nice", { data });
				setUser(data);
			},
		},
	);
	const { decrypt } = useDecrypt();
	const verifyMutation = useMutation(
		async () => {
			const tx = await contract?.verifyUser(address);
			console.log("Verifying user ", address);
			await tx.wait();
			return tx.hash;
		},
		{
			onSuccess: (data) => {
				toast({
					title: "Success",
					description: `User verified ${data.slice(0, 10)}`,
					duration: 1000,
					status: "success",
					isClosable: true,
				});
				queryClient.refetchQueries(["getUnverifiedUsers"]);
				onClose();
			},
			onError: () => {
				toast({
					title: "Error",
					description: "Couldn't load user info",
					duration: 3000,
					status: "error",
				});
				onClose();
			},
		},
	);
	return (
		<>
			<Modal
				blockScrollOnMount={false}
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
				<ModalContent>
					<ModalHeader>Verify User</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text fontWeight="bold" mb="1rem">
							{address}
						</Text>
						{isLoading ? (
							<Spinner />
						) : (
							<>
								<VStack mb={4} alignItems="flex-start">
									<Text fontWeight={"bold"}>Name</Text>
									<Text>{user?.name}</Text>
									<Text fontWeight={"bold"}>Age</Text>
									<Text>{user?.age && JSON.parse(user?.age)}</Text>
									<Text fontWeight={"bold"}>Email</Text>
									<Text>{user?.email}</Text>
									<Text fontWeight={"bold"}>City</Text>
									<Text>{user?.city}</Text>
									<Text fontWeight={"bold"}>Document</Text>
									<Text>{user?.document}</Text>
								</VStack>
								<HStack>
									<Button onClick={() => decrypt({ cid: user?.panNumber })}>
										View Pan
									</Button>
									<Button onClick={() => decrypt({ cid: user?.aadharNumber })}>
										View Aadhar
									</Button>
								</HStack>
							</>
						)}
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="green"
							onClick={() => {
								verifyMutation.mutate();
							}}
							rounded={"full"}
							isLoading={verifyMutation.isLoading}
							loadingText="Verifying User"
						>
							Confirm
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default VerifyUser;
