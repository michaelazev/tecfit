import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import LoginPage from './pages/login';
import Sobrepage from './pages/sobre';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sobre",
    element: <Sobrepage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

