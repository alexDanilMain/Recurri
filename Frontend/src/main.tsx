import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Home from './components/Home/Home.tsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login.tsx'
import AboutUs from './components/AboutUs/AboutUs.tsx'
import ViewTemplate from './components/Home/ViewTemplate/ViewTemplate.tsx'
import { Template } from './components/Home/CreateTemplate/CreateTemplate.tsx'

const tempTemplate: Template = {
    "templateName": "dwaddwad",
    "weeks": [
        {
            "number": 1,
            "events": [
                {
                    "name": "adwd",
                    "description": "adwdawd",
                    "day": 2,
                    "startTime": "12:03",
                    "endTime": "12:21",
                    "recurrence": ""
                },
                {
                    "name": "wdawd",
                    "description": "awdawd",
                    "day": 3,
                    "startTime": "12:24",
                    "endTime": "05:25",
                    "recurrence": ""
                }
            ]
        },
        {
            "number": 2,
            "events": [
                {
                    "name": "dadwdaw",
                    "description": "dawdaw",
                    "day": 1,
                    "startTime": "23:11",
                    "endTime": "12:24",
                    "recurrence": ""
                },
                {
                    "name": "dawd",
                    "description": "dawdaw",
                    "day": 2,
                    "startTime": "13:13",
                    "endTime": "12:23",
                    "recurrence": ""
                }
            ]
        },
        {
            "number": 3,
            "events": [
                {
                    "name": "dawd",
                    "description": "dwadw",
                    "day": 3,
                    "startTime": "12:12",
                    "endTime": "04:24",
                    "recurrence": ""
                }
            ]
        }
    ]

}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/template",
    element: <ViewTemplate template={tempTemplate}/>,
  },
  {
    path: "home/createtemplate",
    element: <Home />,
  },
  {
    path: "home/createtemplate/*",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
)


