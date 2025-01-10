import { createContext, useEffect, useReducer } from "react"
import { AuthReducer } from "./AuthReducer";

const INTIAL_STATE={
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    error:false
}
export const AuthContext=createContext(INTIAL_STATE);

export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INTIAL_STATE);
    useEffect(() => {
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", state.user.token);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token")
        }
    }, [state.user]); 

    return(
        <AuthContext.Provider  value={{
            state,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}