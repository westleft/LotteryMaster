import { authActions } from "@/store/auth";
import { networkActions } from "@/store/network";
import { AppDispatch } from '@/store/';

export function useConnectState(dispatch: AppDispatch) {
  const { selectedAddress: walletAddress, chainId } = window.ethereum;

  dispatch(
    authActions.loginInit({
      isLogin: walletAddress ? true : false,
      walletAddress,
    })
  );

  dispatch(networkActions.changeChainId(chainId));
}
