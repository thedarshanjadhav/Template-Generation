import React from 'react'
import ReactDOM from 'react-dom/client'
import {  RouterProvider } from "react-router-dom";
import { router } from './routes/route';
import { ChakraProvider } from '@chakra-ui/react'
import store from './app/store';
import {Provider} from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
)
