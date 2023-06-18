import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
// import "@/styles/_reset.scss"
import { RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import store from "@/store/"
import router from "./route/"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
