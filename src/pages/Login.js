import React from "react";
import {auth,provider} from "../config/firebase"
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
function Login()
{
    const navigate=useNavigate();
    const SignInwithGoogle=async()=>
    {
        const result=await(signInWithPopup(auth,provider))
        console.log(result)
        navigate('/')
    }

    return(
        <>
       <h1> Welcome to Login page</h1>
       <button onClick={SignInwithGoogle}>Sign In with Google</button>
        </>
    )
}export default Login;