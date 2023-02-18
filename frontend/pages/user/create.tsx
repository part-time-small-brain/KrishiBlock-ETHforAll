import { Box, Button, useDisclosure, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

import { FormField, UserConfirmModal } from "../../components/Form";

const Auth: NextPage = () => {
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

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deployEncrypted = async (e) => {
    const sig = await Signature();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
    const response = await lighthouse.uploadEncrypted(
      e,
      sig.publicKey,
      apiKey,
      sig.signedMessage,
      progressCallback
    );
    console.log(response.data.Hash);

    const cid = response.data.Hash;
    const { publicKey, signedMessage } = await Signature();
    const publicKeyUserB = ["0xc5074464eBF403a44D4CFECe2C532aF0D9b6DF22"];
    const res = await lighthouse.shareFile(
      publicKey,
      publicKeyUserB,
      cid,
      signedMessage
    );
    console.log(res);
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
        <h3>Aadhar</h3>
        <input onChange={(e) => deployEncrypted(e)} type="file" />
        <h3>PAN</h3>
        <input onChange={(e) => deployEncrypted(e)} type="file" />
        {/* <FormField name="aadhar" errorsObj={errors.aadhar} register={register} /> */}
        {/* <FormField name="pan" errorsObj={errors.pan} register={register} /> */}
        <FormField
          name="document"
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
            setData(formData);
            confirmOnOpen();
          })}
          colorScheme={"yellow"}
          minW="48"
        >
          Add
        </Button>
      </VStack>
      <UserConfirmModal
        isOpen={confirmIsOpen}
        onClose={confirmOnClose}
        data={data}
      />
    </Box>
  );
};

export default Auth;
