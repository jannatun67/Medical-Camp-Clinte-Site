import {createBrowserRouter, } from "react-router-dom";
import MainLayout from "../LayOut/MainLayout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivetRoute from "./PrivetRoute";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import CampDetails from "../Components/CampDetails/CampDetails";
import Analytics from "../Pages/UserDashboard/Analytics";
import AddCamp from "../Pages/AdminDashboard/AddCamp";
import ManageCamp from "../Pages/AdminDashboard/ManageCamp";
import ManageCampUpdate from "../Pages/AdminDashboard/ManageCampUpdate";
import ErrorPage from "../Pages/Error/ErrorPage";
import JoinCamp from "../Components/JoinCamp/JoinCamp";
import CampRegister from "../Pages/UserDashboard/CampRegister";
import Payment from "../Pages/UserDashboard/Payment/Payment";
import Participant_Profile from "../Pages/UserDashboard/Participant_Profile/Participant_Profile";
import Participant_ProfileUpdate from "../Pages/UserDashboard/Participant_Profile/Participant_ProfileUpdate";
import Admin_Profile from "../Pages/AdminDashboard/Admin_profile/Admin_Profile";
import JoinUs from "../Pages/JoinUs/JoinUs";
import HistoryPayment from "../Pages/UserDashboard/HistoryPayment";
import ManageRegistered from "../Pages/AdminDashboard/ManageRegistered/ManageRegistered";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path: "/",
            element:<HomePage></HomePage>,
        },
        {
          path:"/availableCamps",
          element:<AvailableCamps></AvailableCamps>
        },
        {
          path:"/camp-details/:id",
          element:<PrivetRoute><CampDetails></CampDetails></PrivetRoute>,
          loader:({params})=> fetch(`https://medical-camp-server-site.onrender.com/medicalCamps/${params.id}`)
        },
        {
          path:"/joinUs",
          element:<JoinUs></JoinUs>
        },

        {
          path: "/login",
          element:<Login></Login>,
        },
        {
          path: "/signUp",
          element:<SignUp></SignUp>
        },
        {
          path:"*",
          element:<ErrorPage></ErrorPage>
        }
      ]
    },
    {
      path:"/dashboard",
      element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
      children:[
          {
            path:"/dashboard/analytics",
            element:<Analytics></Analytics>
          },
          {
            path:"/dashboard/register",
            element:<CampRegister></CampRegister>
          },
          {
            path:"/dashboard/payment/:id",
            element:<Payment></Payment>
          },
          {
            path:"/dashboard/Participant_Profile",
            element:<Participant_Profile></Participant_Profile>
          },
          {
            path:"/dashboard/Participant_ProfileUpdate/:id",
            element:<Participant_ProfileUpdate></Participant_ProfileUpdate>,
          },
          {
            path:"/dashboard/paymentHistory",
            element:<HistoryPayment></HistoryPayment>
          },
          // Admin Camp
          {
            path:"/dashboard/addCamp",
            element:<AddCamp></AddCamp>
          },
          {
            path:"/dashboard/manageCamps",
            element:<ManageCamp></ManageCamp>
          },
          {
            path:"/dashboard/updateCamp/:id",
            element:<ManageCampUpdate></ManageCampUpdate>,
            loader:({params}) => fetch(`https://medical-camp-server-site.onrender.com/medicalCamps/${params.id}`)
          },
          {
            path:"/dashboard/organizerProfile",
            element:<Admin_Profile></Admin_Profile>
          },
          {
            path:"/dashboard/registeredCamps",
            element:<ManageRegistered></ManageRegistered>
          }
         
      ]
    },
  ]);

export default router;