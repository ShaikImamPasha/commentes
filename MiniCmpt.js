import { useEffect, useState } from "react";
import { ComponentFun } from "./ComponentFun";
import io from "socket.io-client";
import dotenv from 'dotenv';
dotenv.config()


const MiniCmpt=({data,indexKey,replay,replayAva})=>{
    const [rePlaySearch,setRePlaySearch]=useState("");
    const socket = io(process.env.Back_Socket_Url);
    useEffect(()=>{
  
    },[])
  function fun(){
    socket.emit('addReply', {
        restaurantId: 111,
        commentIndex:replayAva===true?replay:indexKey,
        newReply: {
          name: "pasha",
          message: `@${data.name}`+" "+rePlaySearch,
        }
      });
      socket.on('replyError',(rep)=>{
          console.log(rep);
      })
      setRePlaySearch("")
  }
return <>
        <form onSubmit={(e) => e.preventDefault()}>
              <p>{data.name}</p>
              <p className="ml-4">{data.message}</p>
           {data.replies && <input type="text" placeholder="Replay" value={rePlaySearch}  onChange={(e)=>setRePlaySearch(e.target.value)}></input> }
           {replayAva && <input type="text" placeholder="Replay" value={rePlaySearch}  onChange={(e)=>setRePlaySearch(e.target.value)}></input> }
           <button onClick={()=>fun()}>addReplay</button>
              <div className="ml-7 flex">
              {<ComponentFun data={data.replies}  replay={indexKey} replayAva={true}/>  }
              </div>
              </form>
    </>
}
export default MiniCmpt;