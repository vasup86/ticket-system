import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Button from "@mui/material/Button";

import "./chat.css";

const socket = io("http://localhost:5000");

export default function UserTicketDetail() {
  const location = useLocation();
  const { agent_id, ticket_id, user_id } = location.state;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () =>
      fetch(
        "https://ticket-system-backend-hsoh.onrender.com/getTicketMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketID: ticket_id }), //send our user data as POST
        }
      )
        .then((res) => res.json()) // get scraped data as GET
        .then((data) => {
          setMessages(data["result"]);
        });
    fetchMessages();
  }, []);

  const sendMessage = () => {
    if (!message) {
      return;
    }
    const messageData = {
      ticketID: ticket_id,
      userID: user_id,
      agentID: agent_id,
      creator: "user",
      message: message,
    };
    socket.emit("send_message", messageData);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h1>User</h1>
      <div className="chat-messages">
        {messages?.map((msg, index) => (
          <div key={index} className={msg.creator === "user" ? "you" : "them"}>
            <p>
              {/* <strong>{msg.creator === "user" ? "You" : "Them"}:</strong>{" "} */}
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
