import React from "react";
import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import "../componenets/Nav.css";
import {signOut} from "firebase/auth";
import { async } from "@firebase/util";
function Nav()
{
    const [user]=useAuthState(auth);
    const signUserOut=async()=>
    {
        await signOut(auth);
    }
    return(
        <>
        <div className="Header">
            <div className="Title">
                Chat Application 
            </div>
            
        <div className="Navbar">
            <div>
        <Link to="/">home</Link></div>
        {user ? <Link to="/Create">Create Post</Link>:
        <Link to="/Login">Login</Link>
        
    }
        </div>
    
        {user &&(
        <div class="Profile">
            <p>{user?.displayName}</p>
            <img  src={user?.photoURL ||"" }width="250px" />
            <button onClick={signUserOut}>
                Log Out
            </button>
        </div>
        )}
        </div>
        </>
    )
}export default Nav;