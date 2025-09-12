import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/user/User.jsx'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'
import Login from'./components/Login/Login.jsx'
import SignUp from './components/Signup/Signup.jsx'
import BulkOrderPage from './components/Bulkorder/Bulk.jsx'
import Payment from './components/Payment/Payment.jsx'
// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout/>,
//     children :[
//       { path:"",
//         element:<Home/>
//       },
//       {
//         path:"about",
//         element:<About/>
//       },
//       {
//         path:"contact",
//         element:<Contact/>
//       }
//     ]
//   }
// ])
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
       <Route path='' element={<Home/>}/>
        <Route path='about' element={<About/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='user/:userid' element={<User/>}/>
                    <Route path='bulkorder' element={<BulkOrderPage/>}/>
                              <Route path='payment' element={<Payment/>}/>


          <Route
          loader={githubInfoLoader} s
          path='github' element={<Github/>}/>
          <Route path ='login' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
