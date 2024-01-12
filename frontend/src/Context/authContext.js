import { createContext } from "react";

const AouthContext = createContext({
    isLoggedIn : false,
    token : null,
    userInfos : null,
    login : () => {},
    logout : () => {}
})

export default AouthContext