import {
	Box,
	Button,
	Heading,
	Input,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

import { FormField, UserConfirmModal } from "../../components/Form";

const _hashes = {
	pan: "",
	adhar: "",
};

const Auth: NextPage = () => {
	const [hashes, setHashes] = useState<typeof _hashes>(_hashes);
	const Signature = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		const messageRequested = (await lighthouse.getAuthMessage(address)).data
			.message;
		const signedMessage = await signer.signMessage(messageRequested);
		return {
			signedMessage: signedMessage,
			publicKey: address,
		};
	};

	const progressCallback = (progressData: any) => {
		let percentageDone = (
			100 -
			(progressData.total || 0) / (progressData.uploaded || 0)
		).toFixed(2);
		console.log(percentageDone);
	};

	const deployEncrypted = async (
		e: ChangeEvent<HTMLInputElement> | any,
		name: "adhar" | "pan",
	) => {
		const sig = await Signature();
		const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
		const response = await lighthouse.uploadEncrypted(
			e,
			sig.publicKey,
			apiKey,
			sig.signedMessage,
			progressCallback,
		);
		const cid = response.data.Hash;
		const { publicKey, signedMessage } = await Signature();
		const publicKeyUserB = ["0xC7feFe2b89d64963eE8521bb44b98b8CA68479b2"];
		const res = await lighthouse.shareFile(
			publicKey,
			publicKeyUserB,
			cid,
			signedMessage,
		);
		console.log("res", res);
		switch (name) {
			case "adhar":
				setHashes({ ...hashes, adhar: res.data.cid });
				break;
			case "pan":
				setHashes({ ...hashes, pan: res.data.cid });
				break;
		}
	};

	const {
		isOpen: confirmIsOpen,
		onOpen: confirmOnOpen,
		onClose: confirmOnClose,
	} = useDisclosure();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [data, setData] = useState<any>();
	return (
		<Box p={4}>
			<VStack spacing={4} maxW="container.md">
				<FormField name="name" errorsObj={errors.name} register={register} />
				<FormField name="age" errorsObj={errors.age} register={register} />
				<FormField name="city" errorsObj={errors.city} register={register} />
				<Heading textAlign={"left"} w="full" fontSize={"lg"}>
					Aadhar
				</Heading>
				<input
					required
					onChange={(e) => deployEncrypted(e, "adhar")}
					type="file"
				/>
				<Heading textAlign={"left"} w="full" fontSize={"lg"}>
					PAN
				</Heading>
				<input
					required
					onChange={(e) => deployEncrypted(e, "pan")}
					type="file"
				/>
				<FormField
					name="phone no"
					errorsObj={errors.name}
					register={register}
				/>
				<FormField
					name="email"
					inputProps={{ type: "email" }}
					errorsObj={errors.name}
					register={register}
				/>

				<Button
					onClick={handleSubmit((formData) => {

						console.log(formData)
						setData(formData);
						confirmOnOpen();
					})}
					colorScheme={"yellow"}
					disabled={hashes.adhar === "" || hashes.pan === ""}
					minW="48"
				>
					Add
				</Button>
			</VStack>
			<UserConfirmModal
				isOpen={confirmIsOpen}
				onClose={confirmOnClose}
				data={{ ...data, hashes }}
			/>
		</Box>
	);
};

export default Auth;
