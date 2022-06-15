import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsers } from "../utilities/APIRoutes";


function Chat() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [getCookie, removeCookie] = useCookies([]);

    useEffect(() => {
        if(!getCookie.jwt) {
          navigate("/login");
        } 
        
        else {
            setCurrentUser(await JSON.parse(localStorage.getItem("loggedInUser")))
        }
      }, []);

    useEffect( async () => {
        if(currentUser) {
            if(currentUser.isAvatarImageSet) {
                const data = await axios.get(`${allUsers}/${currentUser._id}`);
                const contactsSet = setContacts(data.data);
                console.log("This is data.data: ", contactsSet);
            }

            else {
                navigate("/profilePicture")
            }
        }
    }, [currentUser])

  return <Container>
    <div className="container">
    <Contacts contacts={contacts} />
    </div>
</Container>
  
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