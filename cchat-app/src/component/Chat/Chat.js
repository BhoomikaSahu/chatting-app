import { user } from "../Join/Join.js";
import socketIo from "socket.io-client";
import { useEffect, useState } from "react";
import Message from "../Message/Message.js";
import closeIcon from "../../images/closeIcon.png";
import ReactScrollToBottom from "react-scroll-to-bottom";

import "./Chat.css";

const ENDPOINT = "http://localhost:5000/";

let socket;
const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const messageSend = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };
console.log(messages);
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("Connected");
      setId(socket.id);
    });
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [socketIo]);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2> C Chat</h2>
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, index) => 
            <Message message={item.message} user={item.id===id?'':item.user} classs={item.id===id?'right':'left'} />
          )}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button onClick={messageSend} className="sendBtn" >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
