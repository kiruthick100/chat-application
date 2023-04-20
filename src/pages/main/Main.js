import React, { useEffect, useState } from "react";
import {getDocs,collection} from "firebase/firestore/lite";
import {db}from "../../config/firebase";
import Post1 from "./Post1";

function Main()
{
    const [postList,setPostLists]=useState([]);
    const postsRef=collection(db,"posts");
    const getposts=async()=>
    {
        console.log("awrvr")
        const data = await getDocs(postsRef);
        setPostLists(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id }))

            );
            console.log(data)
       
}

    
    useEffect(()=>
    {
        getposts();
    },[]);
    return(
        <>
          {postList.length >= 1 && postList.map( (v) => {
            console.log(v.comments);
            return <Post1 title = {v.Title} description = {v.description} usename={v.username} image={v.userImage} userid={v.userId} image1={v.getImageId}id={v.id} likes={v.likes} command={v.comments}/>
          })}
        
        </>
    )
}export default Main;