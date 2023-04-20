import "./Main";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, deleteDoc,setDoc,addDoc,getDocs ,collection} from "firebase/firestore/lite";
import {auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import Comands from "./Comands";
import "./post1.css";
function Post1(prop){
  const [user]=useAuthState(auth);
  
  // const u=user.prop.userid
    const [url1,seturl]=useState("")
    const storage = getStorage();
    const starsRef = ref(storage, "postImages/"+prop.image1+"/img");
    
    getDownloadURL(starsRef)
      .then((url) => {
        seturl(url);
        
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            break;
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
      

const removePost=async()=>
{

   if(user?.displayName==prop.usename)
   {

  
   await deleteDoc(doc(db, "posts",prop.id)).then( (e) => {
    window.location.reload();

   }).catch((e)=>{
   });
  }else{
    alert("you does not post thise post ")
  }

}
var array
const[likelist,setlikelist]=useState()
const like1=async()=>
{
   array=prop.likes
  // console.log(user.uid)
  var e=user?.uid
  const index =  array.indexOf(e);
if (index > -1) { // only splice array when item is found
  array.splice(index, 1); // 2nd parameter means remove one item only
}
else{
  array.push(e)
}
 setlikelist(array.length)
console.log(array)
 like(array)
  
}
const like=async(array)=>
{
  // console.log(prop.id)
  await setDoc(doc(db, "posts", prop.id), {
   
    Title:prop.title,
    description:prop.description+"",
    username:prop.usename,
    userId: prop.id+"",
    getImageId : prop.image1+"",
    likes:array,
    comments:prop.command
  });
}
const [comm,setcomm]=useState("")
const command2=(e)=>
{
  setcomm(e.target.value)
}
var count;

const command1=async()=>
{
   var com=prop.command;
  com.push({comm:comm,useid:prop.usename,prfile:user?.photoURL ||"" })
  count=0
  console.log(com);
  await setDoc(doc(db, "posts", prop.id), {
   
    Title:prop.title,
    description:prop.description+"",
    username:prop.usename,
    userId: prop.id+"",
    getImageId : prop.image1+"",
    likes:prop.likes,
    comments:com
  });
  setcomm("")
}
const postsRef1=collection(db,"posts");
const[discomm,setdiscomm]=useState(true);
 const [de,set1]=useState([])
 const[discom,setdiscom]=useState([]);

const view=async()=>
{
  
  const data = await getDocs(postsRef1);
  set1(
      data.docs.map( (doc) => ({...doc.data(), id:doc.id }))

      );
      heid()
      // console.log(discom)
}

const heid=async()=>
{
  var d=[]
     await de.map((e)=>
      {
        if(e.id==prop.id)
        {
          e.comments.map((e1)=>
          {
            d.push(e1);
            
          })
        }
      })
      setdiscom(d);
      setdiscomm(!discomm)
     
}
console.log(discom);
useEffect(()=>
{

},[discom])
    return(

       <>
       <style>
       <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
       </style  >
       <center>
        <div className="posts-Item">
          <div className="post-head">
          <div className="profile-post">
          <span class="material-symbols-outlined">
account_circle
</span>
  <p> {prop.usename}</p>
  </div>
        <div className="delete">
        <button  className ="remove-post" class="material-icons hello"onClick={removePost}>delete</button>
</div>

</div>
       
       <div className="title">
        <h1>{prop.title}</h1>
       </div>
      
       <div className="post-image">
        <p>
            <p><img className="image-post" src={url1}/></p>
        </p>
       </div>
       <div className="descrition">
        <p>
            {prop.description}
        </p>
       </div>
       Likes {prop.likes.length>0? prop.likes.length:""}  &nbsp;

       command {prop.command.length}<br></br>
       {prop.command.length>0 && discomm? <button onClick={view}>showCommands</button>:<button onClick={heid}>hidden</button>}<br></br>
     {/* <div> {discomm ? discom.map((e)=>console.log(e)):""}</div> */}
     {discomm&&discom.map((e)=>
     {
      return(
        <div className="commands-user">
        <img  className="commands-profile"src={e.prfile}></img>
        <span className="commands-name">{e.useid}</span>&nbsp;<p style={{color:"black"}}>{e.comm}</p>
        <br></br>
      </div>
      )
     })}
       <button onClick={like1}>&#128077;</button><br></br>
       <input type="text" value={comm}placeholder="command your " onChange={command2}></input>
       <button onClick={command1} class="material-symbols-outlined">
arrow_right_alt
</button>
       {/* <button onClick={command1}>comm</button> */}

       
       </div>
       </center>
       </>
    )
}export default Post1;