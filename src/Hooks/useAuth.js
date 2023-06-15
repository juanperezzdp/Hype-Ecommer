import {authContext} from "../context/AuthContext"
import {useContext} from "react"


export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
      throw new Error ("Trere is not auth provider")
    }
    return context;
  };