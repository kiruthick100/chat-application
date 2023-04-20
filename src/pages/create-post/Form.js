import {useForm} from "react-hook-form";
import *  as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc,collection} from "firebase/firestore/lite";
import {db} from "../../config/firebase"
import {auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import  { storage } from "../../config/firebase"
import { ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage"
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore/lite"; 

// interface CreateFormData
// {
//     Title:string;
//     description:string;
// }
function Form()
{
    const [user]=useAuthState(auth);
    
    const navigate=useNavigate();
const [PostImage, setPostImage] = useState(null);
    const setImage = (e)=>{
        {e && setPostImage(e.target.files[0])}
        console.log(e.target.files[0]);
    }

    const uploadImage = async (postId)=> {
        if(PostImage == null) return;
        const imagref = ref(storage, "postImages/"+postId+"/img");
       await  uploadBytes(imagref,PostImage).then(
            ()=>{

                console.log("image uploaded");
            }
        )
    }
    const schema=yup.object().shape({
        Title:yup.string().required("you must add a title."),
        description:yup.string().required("you must add a descrition."),
    });
    const {register,handleSubmit,formState:{errors}}=useForm(
        {
            resolver:yupResolver(schema),
        }
    );
    const postsRef=collection(db,"posts")
    
    const onCreatepost=async(data)=>
    {
        // console.log(data);
        // await addDoc(postsRef,
        //     {
                // ...data,
                // // title:data.title,
                // // description:data.description,
                // username:user?.displayName,
                // userId:user?.uid,
                // userImage:user?.photoURL
                
            // })
            // navigate('/')
            if(!user) return;
        if(PostImage == null){
            alert("Must add an image");
            return;
        }
          const timestamp =  user.uid+Date.now();
       console.log("time"+timestamp);
       await  addDoc (postsRef, {
            ...data,
            
            username: user?.displayName,
            userId: user?.uid,
            getImageId : timestamp,
            likes:[],
            comments:[]

       }).then(async ()=>{
        alert("post added succesfully");
        alert("image uploading please wait a moment")
        await uploadImage(timestamp );
        
         navigate("/");
         window.location.reload();
        
       })
    }
    return(
        <div className="postbox">
        <form onSubmit={handleSubmit(onCreatepost )} style={{height:"250px",width:"250px"}}>
            <input placeholder="Title"{...register("Title")}/>
            <p style={{color:"red"}}>{errors.Title?.message}</p>
            <textarea placeholder="description"{...register("description")}/>
            <p style={{color:"red"}}>{errors.description?.message}</p>
            <label className="postImageLabel" htmlFor="postImage">
                <i className="fa fa-2x fa-camera"></i><span className="postImageName">{PostImage?.type}</span>
                <input  id="postImage" className="inputFile"    type="file" onChange={ setImage } />
                </label>
            {/* <button> Submit</button> */}
            <input type="submit"></input>
        </form>
        </div>
    )
}
export default Form;