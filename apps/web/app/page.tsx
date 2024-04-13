"use client"
import React from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";

export default function Page(): JSX.Element {
  const { sendMessage } = useSocket();
  const [message, setMessage] = React.useState<string>('');

  return (
    <React.Fragment>
    <div>
      <h1>Messages will appear here!!</h1>
    </div>
    <div className={classes["message-container"]}>
      <input onChange={(e) => setMessage(e.target.value)} className={classes["message-input-box"]} type="text" placeholder="Enter your message here..." />
      <button onClick={() => sendMessage(message)} className={classes["send-button"]}>Send</button>
    </div>
    </React.Fragment>
  );
}
