import { Outlet } from "react-router-dom"
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { useConnectState } from "@/hooks/useConnectState";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    useConnectState(dispatch);
  }, [])

  return(
    <>
      <ToastContainer position="bottom-right" />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
