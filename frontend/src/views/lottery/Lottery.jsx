import { useLoaderData } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LotteryPage = () => {
  const data = useLoaderData()
  const notify = () => toast("Wow so easy!");

  return(
    <>
      { data.msg }
      <h1>Lottery</h1>
      <button onClick={notify}>Notify!</button>
    </>
  )
}

export default LotteryPage;