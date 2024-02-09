import "./style.scss"
import Sidebar from "./components/sidebar/Sidebar"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import AboutUs from "./pages/AboutUs";
import SingleNote from "./components/single_note/SingleNote"
import Error from "./pages/Error";

import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Write from "./components/write/Write";

function App() {

  const Layout = () => {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>  
          <Sidebar />
          <div style={{ flex: 6, }}>
            <Outlet />
          </div>
        </div>
  
        <Footer />
      </>
    );
  };
  
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  const router = createBrowserRouter([
    {
      path: "/",
      element:(
        <ProtectedRoute>
           <Layout /> 
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/write",
          element: <Write />,
        },
        {
          path: "/single-note/:id",
          element:<SingleNote/>
        },

        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/*",
          element: <Error />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
