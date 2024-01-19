import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useGetCurrentUserMutation } from "../../lib/Apis/userApi";
import { io } from "socket.io-client";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../../Input/Input";

import "./Chat.css";

const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const [room, setRoom] = useState("Group Chat");
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = useRef(io(ENDPOINT));

  const [getCurrentUser, { data, isSuccess }] = useGetCurrentUserMutation();

  const { user } = useSelector((state) => state.userState);

  useEffect(() => {
    const getCurrentUserData = async () => {
      await getCurrentUser();
    };

    getCurrentUserData();
  }, []);

  useEffect(() => {
    if (isSuccess && user?.currentUser) {
      setName(user?.currentUser?.username);
      socket?.current.emit("join", {
        name: user?.currentUser?.username,
        room,
      });
    }
  }, [user?.currentUser]);

  useEffect(() => {
    socket?.current.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket?.current.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket?.current.emit("sendMessage", message, () => setMessage(""));

      return setMessage("");
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
