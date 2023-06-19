import { ethers } from "ethers"

export const useContract = async (contractAddress, abi) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
}
