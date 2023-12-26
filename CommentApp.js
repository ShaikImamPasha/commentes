import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { ComponentFun } from "./ComponentFun";
import dotenv from 'dotenv';
dotenv.config()
import MiniCmpt from "./MiniCmpt";
const CommentApp = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const socket = io(process.env.Back_End_Socket_Api_Url);

  useEffect(() => {

    socket.emit('requestInitialData', { restaurantId: 212 });

    // Listen for the initial data response from the server
    socket.on('initialData', (initialData) => {
      console.log(initialData);
      setCommentsData(initialData);
    });
    // Listen for new comments
    socket.on('newComment', (newComment) => {
      console.log("new",newComment);
       setCommentsData(newComment)
    });

    socket.on('newReply', (initialData) => {
      console.log(initialData);
      setCommentsData(initialData);
    });
    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, []);


  const pushComment = () => {
    // Emit a socket event to add a new comment
    socket.emit('addComment', {
      restaurantId: 212,
      newComment: {
        name: "imam",
        message: searchValue,
      },
    });

    setSearchValue("");
  };

  return (
    <div>
      <div>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="add comment"
          type="text"
        ></input>
        <button onClick={pushComment}>add comment</button>
      </div>
      {commentsData && commentsData.length === 0 ? (
        <p className="w-[100px] h-[100px] border-2 border-solid"></p>
      ) : (
        <ComponentFun data={commentsData.comments} />
      )}
    </div>
  );
};

export default CommentApp;
