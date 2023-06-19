import { authActions } from "@/store/auth"

export function useConnectState(dispatch) {
  const walletAddress = window.ethereum.selectedAddress;
  
  dispatch(authActions.loginInit({
    isLogin: (walletAddress ? true : false),
    walletAddress
  }))
}
