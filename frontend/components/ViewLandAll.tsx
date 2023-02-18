import {
	Link,
	Tooltip,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Wrap,
	WrapItem,
	VStack,
	Flex,
	Box,
	useColorModeValue,
	ModalFooter,
	Button,
	Text,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useWeb3Store from "../utils/web3store";

export default function ViewDetail({
	data,
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
	data: landType;
}) {
	const [userInfo, setUserInfo] = useState<any>({
		name: "Loading...",
		age: 4,
		isUserVerified: false,
		email: "Loading...",
		phone: "Loading...",
	});
	const contract = useWeb3Store((state) => state.contract);
	useQuery(
		["user", data.ownerAddress],
		async () => {
			const ownerInfo = await contract?.UserMapping(data.ownerAddress);
			return ownerInfo;
		},
		{
			onSuccess(data) {
				setUserInfo(data);
			},
		},
	);
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
				<ModalOverlay backdropFilter={"blur(8px)"} />
				<ModalContent>
					<ModalHeader>Land Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Wrap w="full" spacing={8}>
							<WrapItem>
								<VStack alignItems={"start"}>
									<Flex gap={4} alignItems={"center"}>
										<Text fontWeight={"bold"} fontSize="3xl">
											Land {data.id}
										</Text>
										{data?.isLandVerified ? (
											<Tooltip label="verified by lekhpal" placement="right">
												<Box
													color={"twitter.300"}
													w={"12"}
													h={"12"}
													position="relative"
													top={-1}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="currentColor"
														style={{
															width: "100%",
															height: "100%",
														}}
													>
														<path
															fillRule="evenodd"
															d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
															clipRule="evenodd"
														/>
													</svg>
												</Box>
											</Tooltip>
										) : null}
									</Flex>
									<Text fontWeight={"bold"} fontSize="3xl">
										{JSON.stringify(data.area as any)} Sq.Ft
									</Text>
									<Text fontWeight={"bold"} fontSize="xl">
										{data.address?.slice(0, 23)}
										{(data.address?.length as number) > 23 && "..."}
									</Text>
								</VStack>
							</WrapItem>
							<WrapItem>
								<Box
									rounded={"2xl"}
									bg={useColorModeValue("gray.100", "gray.800")}
									p={4}
									px={6}
								>
									<Text
										display={"inline-flex"}
										alignItems="center"
										gap={2}
										fontWeight={"bold"}
										fontSize="xl"
									>
										{userInfo.name || "User"}, {JSON.parse(userInfo.age)}{" "}
										{userInfo?.isUserVerified ? (
											<Tooltip label="verified by lekhpal" placement="right">
												<Box
													color={"twitter.300"}
													w={"6"}
													h={"6"}
													position="relative"
													top={-1}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="currentColor"
														style={{
															width: "100%",
															height: "100%",
														}}
													>
														<path
															fillRule="evenodd"
															d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
															clipRule="evenodd"
														/>
													</svg>
												</Box>
											</Tooltip>
										) : null}
									</Text>
									<Text fontSize="sm">{userInfo[0]}</Text>
									<Link href={`mailto:${userInfo.email}`} fontSize="sm">
										{userInfo.email}
									</Link>
									<Text fontSize="sm">{userInfo.aadharNumber}</Text>
									<Text fontSize="sm">{userInfo.panNumber}</Text>
								</Box>
							</WrapItem>
						</Wrap>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="red"
							variant={"outline"}
							mr={3}
							onClick={onClose}
						>
							Close
						</Button>
						<Button
							variant="solid"
							colorScheme={"green"}
							disabled
							leftIcon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									height={20}
									width={20}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
									/>
								</svg>
							}
						>
							Download Paper
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
