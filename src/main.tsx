import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import LogIn from './pages/LogIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Root from './pages/Root.tsx'
import Items from './pages/Items.tsx'
import AddItems from './pages/AddItems.tsx'
import EditItems from './pages/EditItems.tsx'
import Favorites from './pages/Favorites.tsx'
import Orders from './pages/Orders.tsx'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const routes = createBrowserRouter([
  {
      path :"/",
      element :<Auth/>,
      children :[
        {
          path :"",
          element :<LogIn />
        },
        {
          path :"signup",
          element :<SignUp />
        }
      ]
    
  
  },
  {
    path : "/dashboard",
    element : <Root />,
    children :[
      {
        path :"items",
        element:<Items/>,
      },
      {
        path :"items/add",
        element:<AddItems/>
      },
      {
        path :"items/edit/:id",
        element:<EditItems/>
      },
      {
        path :"favorites",
        element:<Favorites/>
      },
      {
        path :"orders",
        element:<Orders/>
      }

    ]
    }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < RouterProvider router={routes} />
    <ToastContainer/>
  </StrictMode>,
)
