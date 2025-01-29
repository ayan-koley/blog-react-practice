import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Signup, AddPost, AllPost, EditPost, Post } from "./pages";
import { Protection } from "./Components/index.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protection authentication={false}>
            <Login />
          </Protection>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protection authentication={false}>
            <Signup />
          </Protection>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protection authentication>
            {" "}
            <AllPost />
          </Protection>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protection authentication>
            {" "}
            <AddPost />
          </Protection>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protection authentication>
            {" "}
            <EditPost />
          </Protection>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
