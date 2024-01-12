import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./Context/authContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});

  const router = useRoutes(routes);

  const login = (userInfos,token) => {
    setToken(token);
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem("user", JSON.stringify({ token }));
  };

  const logout = () => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}
