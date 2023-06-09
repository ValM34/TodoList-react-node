import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.scss";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import CreateTask from "./pages/createTask/CreateTask";
import UpdateTask from "./pages/updateTask/UpdateTask";
import Header from "./layouts/header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/task/create",
    element: <CreateTask />,
  },
  {
    path: "/task/update/:id",
    element: <UpdateTask />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);