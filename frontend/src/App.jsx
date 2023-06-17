import { Outlet } from "react-router-dom"
import Header from "@/components/layouts/header/Header"
import Footer from "@/components/layouts/footer/Footer"
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return(
    <>
    <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
