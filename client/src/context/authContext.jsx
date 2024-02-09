import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [set,unset] = useState(true)

	const showSidebar = () => {
    unset(!set)
	};

 const OffSidebar = () => {
    unset(true)
	};

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      inputs,
      { withCredentials: true }
    );
    setCurrentUser(res.data);
  };
  
  const logout = async (inputs) => {
    await axios.post("http://localhost:5000/api/auth/logout",{ } , { withCredentials: true });
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, showSidebar, set,OffSidebar }}>
      {children}
    </AuthContext.Provider>
  );
};
