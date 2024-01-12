import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AouthContext from "./Context/authContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});

  const router = useRoutes(routes);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("user", JSON.stringify({ token }));
  };

  const logout = () => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }

  return (
    <AouthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout: () => {},
      }}
    >
      {router}
    </AouthContext.Provider>
  );
}
