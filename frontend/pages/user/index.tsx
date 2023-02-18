import {
	Box,
	Divider,
	Heading,
	Link,
	Text,
	Tooltip,
	VStack,
} from "@chakra-ui/react";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useEffect } from "react";
import shallow from "zustand/shallow";
import useWeb3Store from "../../utils/web3store";

const Home: NextPage = () => {
	const [contract, connectedAccount, balance] = useWeb3Store(
		(state) => [state.contract, state.connectedAccount, state.balance],
		shallow,
	);
	const query = useQuery({
		queryKey: ["userInfo"],
		queryFn: async () => {
			const userInfo = await contract?.UserMapping(connectedAccount);
			return userInfo;
		},
	});
	if (query.isLoading) return <>Loading Profile....</>;
	return (
		<Box>
			<Heading fontSize={"4xl"}>User</Heading>
			<Divider my={4} />
			<VStack alignItems={"start"} gap={2}>
				<Text display={"inline-flex"} gap={2} w="full" fontSize={"2xl"}>
					{query.data?.name}, {query.data && JSON.parse(query.data?.age)}{" "}
					{query.data?.isUserVerified ? (
						<Box color={"twitter.300"}>
							<Tooltip label="verified" placement="right">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									style={{
										width: "30px",
										height: "30px",
										position: "relative",
									}}
								>
									<path
										fillRule="evenodd"
										d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
										clipRule="evenodd"
									/>
								</svg>
							</Tooltip>
						</Box>
					) : null}
				</Text>
				<Text>{connectedAccount}</Text>
				<Text>{balance}</Text>
				<Text>{query.data?.email}</Text>
				<Link isExternal>{query.data?.document}</Link>
				<Text>{query.data?.aadharNumber}</Text>
			</VStack>
		</Box>
	);
};
export default Home;
