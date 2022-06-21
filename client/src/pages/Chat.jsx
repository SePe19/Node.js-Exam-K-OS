import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { allUsers, baseURL } from "../utilities/APIRoutes";
import { useCookies } from "react-cookie";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { ToastContainer, toast } from "react-toastify";
import ChatContainer from "../components/ChatContainer";
import io from "socket.io-client";


function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [getCookie, removeCookie] = useCookies([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const verifyUserCookie = async () => {
      if (!getCookie.jwt || !localStorage.getItem("loggedInUser")) {
        navigate("/login");
      }

      else {
        setCurrentUser(JSON.parse(localStorage.getItem("loggedInUser")));
        setIsLoaded(true);
      }
    }
    verifyUserCookie();
  }, [getCookie, navigate]);
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(baseURL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    const fetchAllContacts = async () => {

      try {

        fetch(`${allUsers}/${currentUser._id}`)
          .then(response => response.json())
          .then(data => setContacts(data))

        toast.success("Select a user to start chatting", toastOptions);

      } catch (error) {
        console.log("Unable to fetchAllContacts: ", error);
      }
    };
    fetchAllContacts();
  }, [currentUser])


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (<Container>
    <div className="container">
      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        changeChat={handleChatChange}
      />
      {isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser} />
      ) : (
        <ChatContainer 
        currentChat={currentChat} 
        currentUser={currentUser} 
        socket={socket} 
        />
      )}
    </div>
    <ToastContainer />
  </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;

export default Chat