import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetUp'
import AdminJobs from './components/admin/AdminJobs'



const approuter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
    // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <Companies/>
  },
  {
    path:"/admin/companies/create",
    element: <CompanyCreate/> 
  },
  {
    path:"/admin/companies/:id",
    element: <CompanySetup/> 
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  }
])


function App() {
  return (
    <>
      <RouterProvider router={approuter}/>
    </>
  )
}

export default App
