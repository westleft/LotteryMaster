import { authActions } from "@/store/auth"
import { networkActions } from "@/store/network"

export function useConnectState(dispatch) {
  const { 
    selectedAddress: walletAddress, 
    chainId 
  } = window.ethereum;
  
  dispatch(authActions.loginInit({
    isLogin: (walletAddress ? true : false),
    walletAddress
  }))
  
  dispatch(networkActions.changeChainId(chainId));  
}
