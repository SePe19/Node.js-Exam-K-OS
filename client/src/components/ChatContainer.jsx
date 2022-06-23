import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { toast } from "react-toastify";
import { addMessage, getMessage } from "../utilities/APIRoutes";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat) {
      const getAllMessages = async (messages) => {
        const data = await axios.post(getMessage, {
          from: currentUser._id,
          to: currentChat._id,
        }, { withCredentials: true });
        setMessages(data.data);
        console.log("data.data", data.data);
        console.log("This is ChatContainer currentUser: ", currentUser);
        console.log("This is ChatContainer currentchat: ", currentChat);
        console.log("This is ChatContainer setMessages: ", messages.data);
      }
      getAllMessages();
    }
  }, [currentChat, currentUser]);

  const handleSendMessage = async (message) => {
    console.log("ChatContainer currentChat._id: ", currentChat._id);
    console.log("ChatContainer currentChat data: ", currentChat);
    console.log("ChatContainer currentUser data: ", currentUser);
    await axios.post(addMessage, {
      from: currentUser._id,
      to: currentChat._id,
      message: message
    }, { withCredentials: true });
    socket.current.emit("send-message", {
      to: currentChat._id,
      from: currentUser._id,
      message: message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (message) => {
        setArrivalMessage({ fromSelf: false, message: message });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (<> {currentChat && (
    <Container>
      <div className="chat-header">
        <div className="user-details">

          <div className="avatar">
            <img src={`${currentChat.avatarImage}`} alt="avatar"/>
          </div>

          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>


        </div>
        <Logout/>
      </div>
      <div className="chat-messages">
        {Array.isArray(messages) ? (
          messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div className={`message ${message.fromSelf ? "sent" : "received"} `}>
                  <div className="content">
                    <p>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })) : (toast.error("Unable to render messages"))}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  )}
  </>
  );
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    background-color: green;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #006400;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #FFFFFF;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;