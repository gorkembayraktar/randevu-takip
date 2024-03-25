import {
    Navigate 
  } from "react-router-dom";

import { Visitor, VisitorQuery, Dashboard, Home, Setting, History, LimitDates, Login, Holiday, Profile, Customers, ProfilePassword } from '../views/pages'

import {Telegram} from "../views/pages/modules";


export const routes = [
    {
        path:'/',
        element:<Visitor />,
        exact:false,
        auth:false,
        withoutSection: true
    },
    {
        path:'/appointment-search',
        element:<VisitorQuery />,
        exact:false,
        auth:false,
        withoutSection: true
    },
    {
        path:'/dashboard',
        element:<Dashboard />,
        exact:true,
        auth:true
    },
    {
        path:'/appointments',
        element:<Home/>,
        exact:true,
        auth:true
    },
    {
        path:'/login',
        element:<Login />,
        exact:true,
        auth:false,
        withoutSection: true
    },
    {
        path:'/customers',
        element:<Customers/>,
        exact:true,
        auth:true
    },
    {
        path:'/setting',
        element:<Setting/>,
        exact:true,
        auth:true
    },
    {
        path:'/history',
        element:<History />,
        exact:true,
        auth:true
    },
    {
        path:'/limit-dates',
        element:<LimitDates />,
        exact:true,
        auth:true
    },
    {
        path:'/holiday',
        element:<Holiday />,
        exact:true,
        auth:true
    },
    {
        path:'/profile',
        element:<Profile />,
        exact:true,
        auth:true
    },
    {
        path:'/profile/password',
        element:<ProfilePassword />,
        exact:true,
        auth:true
    },
    {
        path:'/modules/telegram',
        element: <Telegram />,
        exact:true,
        auth:true
    },
    {
        //404 page navigate to main page
        path: '*',
        element: <Navigate  to="/" />
    }
];


