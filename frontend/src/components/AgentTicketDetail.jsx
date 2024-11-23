import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Button from "@mui/material/Button";
import "./chat.css";

const socket = io("http://localhost:5000");

export default function AgentTicketDetail() {
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
          body: JSON.stringify({ ticketID: ticket_id }),
        }
      )
        .then((res) => res.json())
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
      creator: "agent",
      message: message,
    };
    socket.emit("send_message", messageData);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="bg-blue-700 flex flex-row justify-between items-center">
        <h1
          className=" text-4xl font-bold  text-gray-200"
          style={{ paddingLeft: "4%", paddingTop: "1%", paddingBottom: "2%" }}
        >
          Ticket #{ticket_id}
        </h1>
        <h2 className=" text-lg text-gray-300" style={{ marginRight: "3%" }}>
          Live Chat
        </h2>
      </div>
      <div className="chat-messages">
        {messages?.map((msg, index) => (
          <div key={index} className={msg.creator === "agent" ? "you" : "them"}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="chat-input justify-end flex w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message in here..."
        />
        <Button onClick={sendMessage}>SEND</Button>
      </div>
    </div>
  );
}
