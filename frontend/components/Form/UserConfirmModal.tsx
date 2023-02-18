import {
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	Code,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import useWeb3Store from "../../utils/web3store";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const UserConfirmModal: FC<{
	isOpen: boolean;
	onClose: () => void;
	data: any;
}> = ({ isOpen, onClose, data }) => {
	const [hash, setHash] = useState<string>();
	const toast = useToast();
	const contract = useWeb3Store((state) => state.contract);
	const router = useRouter();
	const mutation = useMutation(async () => {
		const txn = await contract?.registerUser(
			data.name,
			data.age,
			data.city,
			data.hashes.adhar,
			data.hashes.pan,
			data["phone no"],
			data.email,
		);
		console.log("Registering User....");
		await txn.wait();
		setHash(txn.hash);
	});
	const confirmHandler = () => {
		mutation.mutate();
	};
	useEffect(() => {
		if (mutation.isError) {
			toast({
				title: "Error",
				description: "An error occured while registering user",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
		if (mutation.isSuccess) {
			toast({
				title: "User Created",
				description: `User creation successful ${hash?.slice(0, 10)}`,
				status: "success",
				duration: 7000,
				isClosable: true,
			});
			onClose();
			router.push("/user");
		}
	}, [mutation.isSuccess, hash]);
	return (
		<>
			<Modal isOpen={isOpen} colorScheme="yellow" onClose={onClose} isCentered>
				<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
				<ModalContent>
					<ModalHeader>Confirm Adding User</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Create User with the following details
						<Code p={2}>{JSON.stringify(data, null, 8)}</Code>
					</ModalBody>
					<ModalFooter>
						<Button
							variant={"outline"}
							colorScheme="red"
							mr={3}
							onClick={onClose}
						>
							Go Back
						</Button>
						<Button
							colorScheme={"green"}
							onClick={confirmHandler}
							loadingText="Submitting"
							isLoading={mutation.isLoading}
						>
							Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
