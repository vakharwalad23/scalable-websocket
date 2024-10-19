"use client"
import React from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";

export default function Page(): JSX.Element {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = React.useState<string>('');

  return (
    <React.Fragment>
    <div className={classes["message-container"]}>
      <input onChange={(e) => setMessage(e.target.value)} className={classes["message-input-box"]} type="text" placeholder="Enter your message here..." />
      <button onClick={() => { 
        sendMessage(message)
        }} 
        className={classes["send-button"]}>
          Send
          </button>
    </div>
    <div>
      <h1>Messages will appear here!!</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>  
    </div>
    </React.Fragment>
  );
}
