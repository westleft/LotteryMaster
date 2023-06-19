import { networkActions } from "@/store/network"

export async function useNetworkVaild(dispatch) {
  const { chainId } = window.ethereum;
  if (chainId === "0xaa36a7") return;
  
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }],
    });

    location.reload()
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xaa36a7",
              chainName: "Sepolia",
              rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/demo"] /* ... */,
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}
