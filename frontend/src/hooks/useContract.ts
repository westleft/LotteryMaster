import { ethers, InterfaceAbi } from "ethers"

export const useContract = async (contractAddress: string, abi: InterfaceAbi) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
}
