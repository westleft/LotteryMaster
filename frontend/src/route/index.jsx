import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import HomePage, { homeLoader } from "@/views/home/Home"
import LotteryPage from "@/views/lottery/Lottery"

const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      { path: "/", element: <HomePage />, loader: homeLoader, index: true },
      { path: "/lottery", element: <LotteryPage />, loader: homeLoader },
    ]
  },
]);

export default router;
