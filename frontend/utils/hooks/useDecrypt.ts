import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

const useDecrypt = () => {
  const sign_auth_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return { publicKey: publicKey, signedMessage: signedMessage };
  };

  const decrypt = async ({cid}: {cid: string}) => {
    const { publicKey, signedMessage } = await sign_auth_message();
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    const fileType = "image/png";
   
    const decrypted = await (lighthouse.decryptFile as (
        cid: string,
        fileEncryptionKey: string,
        fileType: string
      ) => Promise<File | ArrayBuffer | any>)(
        cid,
        keyObject.data.key,
        fileType
    );

    const url = URL.createObjectURL(decrypted);

    window.open(url, "_blank");
  };

  return {decrypt}
};

export default useDecrypt;