import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../Layout'
import AdminLogin from '../pages/Admin/adminLogin'
import Courses from '../pages/Courses'
import Admin from '../pages/Admin/admin'
import AddCourse from '../pages/Admin/AddCourse'
import AdminCourses from '../pages/Admin/AdminCourses'
export const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path:"/courses",
        element:<Courses/>,
      },
      {
        path:"admin",
        element:<AdminLogin />,
      },
      {
        path:"/adminName",
        element:<Admin/>,
      },
      {
        path:"/adminName/Courses",
        element:<AdminCourses/>,
      },
      {
        path:"/addCourse",
        element:<AddCourse/>
      },
      
    ]
  }
])
