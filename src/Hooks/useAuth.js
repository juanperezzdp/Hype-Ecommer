import {authContext} from "../context/AuthContext"
import {useContext} from "react"


export const useAuth = () => {
    const context = useContext(authContext);
    return context;
  };