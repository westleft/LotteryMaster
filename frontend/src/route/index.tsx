import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/views/home/Home";
import LotteryPage, { loader } from "@/views/lottery/Lottery";
import RulePage from "@/views/rule/Rule";
import TestCoinPage from "@/views/coin/TestCoin";

const router = createHashRouter([
  {
    path: "/", element: <App />, children: [
      { path: "/", element: <HomePage />, index: true },
      { path: "/lottery", element: <LotteryPage />, loader: loader },
      { path: "/rule", element: <RulePage /> },
      { path: "/test-coin", element: <TestCoinPage /> },      
    ]
  },
]);

export default router;
