import {
    Navigate 
  } from "react-router-dom";

import { Home, Setting, History, LimitDates, Login, Holiday, Profile } from '../views/pages'


export const routes = [
    {
        path:'/',
        element:<Home/>,
        exact:true,
        auth:false
    },
    {
        path:'/login',
        element:<Login />,
        exact:true,
        auth:false,
        withoutSection: true
    },
    {
        path:'/setting',
        element:<Setting/>,
        exact:true,
        auth:false
    },
    {
        path:'/history',
        element:<History />,
        exact:true,
        auth:false
    },
    {
        path:'/limit-dates',
        element:<LimitDates />,
        exact:true,
        auth:false
    },
    {
        path:'/holiday',
        element:<Holiday />,
        exact:true,
        auth:false
    },
    {
        path:'/profile',
        element:<Profile />,
        exact:true,
        auth:false
    },
    {
        //404 page navigate to main page
        path: '*',
        element: <Navigate  to="/" />
    }
];


