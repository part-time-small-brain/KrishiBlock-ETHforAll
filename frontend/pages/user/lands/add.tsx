import { Box, Button, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DrawLand from "../../../components/DrawLand";

import { FormField, LandConfirmModal } from "../../../components/Form";

const Auth: NextPage = () => {
	const {
		isOpen: confirmIsOpen,
		onOpen: confirmOnOpen,
		onClose: confirmOnClose,
	} = useDisclosure();
	const {
		isOpen: drawIsOpen,
		onOpen: drawOnOpen,
		onClose: drawOnClose,
	} = useDisclosure();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [data, setData] = useState<any>();
	return (
		<Box p={4}>
			<VStack spacing={4} maxW="container.md" fontSize={"sm"}>
				<FormField
					name="area"
					inputProps={{ type: "number" }}
					errorsObj={errors.area}
					register={register}
				/>
				<FormField
					name="address"
					errorsObj={errors.address}
					register={register}
				/>
				<FormField
					name="price"
					inputProps={{ type: "number" }}
					errorsObj={errors.price}
					register={register}
				/>
				<FormField
					name="pid"
					inputProps={{ type: "number" }}
					errorsObj={errors.pid}
					register={register}
				/>
				<FormField
					name="survey"
					errorsObj={errors.survey}
					register={register}
				/>
				<FormField
					name="land type"
					errorsObj={errors.document}
					register={register}
				/>
				<HStack gap={4}>
					{/* <Button onClick={drawOnOpen} minW="48">
            Draw Land
          </Button> */}
					<Button
						onClick={handleSubmit((formData) => {
							console.log(formData);
							
							setData(formData);
							confirmOnOpen();
						})}
						colorScheme={"yellow"}
						minW="48"
					>
						Add
					</Button>
				</HStack>
			</VStack>
			<LandConfirmModal
				isOpen={confirmIsOpen}
				onClose={confirmOnClose}
				data={data}
			/>
			{/* <DrawLand isOpen={drawIsOpen} onClose={drawOnClose} /> */}
		</Box>
	);
};

export default Auth;
