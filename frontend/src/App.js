import React, { useCallback, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./Context/authContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});

  const router = useRoutes(routes);

  const login = useCallback((userInfos,token) => {
    setToken(token);
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem("user", JSON.stringify({ token }));
  },[])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  },[])

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    if(localStorageData){
      fetch('http://localhost:4000/v1/auth/me',{
        headers :{
          'Authorization' :`Bearer ${localStorageData.token}`
        }
      }).then(res => res.json())
      .then(userData => {
        setIsLoggedIn(true)
        setUserInfos(userData)
      })
    }
    console.log(localStorageData);
  },[token,login])

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
