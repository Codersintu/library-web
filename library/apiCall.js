import axios from "axios";

export const LoginCall=async(userCredential,dispatch)=>{
    dispatch({type:'LOGIN_START'});
    try {
        const res=await axios.post("https://library-web-backend.onrender.com/api/user/login",userCredential);
        dispatch({type:"LOGIN_SUCCESS", payload:res.data});
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE", payload:error});
    };
};
