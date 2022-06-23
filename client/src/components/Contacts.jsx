import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();
  const [currentSelected, setCurrentSelected] = useState();

  // useEffect(() => {
  //   const getLoggedInUserData = async () => {
  //     const data = await JSON.parse(localStorage.getItem("loggedInUser"));
  //   }
  //   getLoggedInUserData();
  // }, []);


  useEffect(() => {
    async function setCurrentUserDetail() {
      if (currentUser) {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
      }
    }
    setCurrentUserDetail();
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container className="contact-column">
          <div className="brand">
            <img src={"https://img.icons8.com/arcade/64/000000/experimental-chat-arcade.png"} alt="logo" />
            <h3>ChatLand</h3>
          </div>
          <div className="contacts">
            {Array.isArray(contacts) ? (
              contacts.map((contact, index) => {
                return (
                  <div className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img src={`${contact.avatarImage}`}
                        alt="avatar" >
                      </img>
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>

                );
              })) : (console.log("Unable to render contacts, refresh please!"))}

          </div>
          <div className="current-user">
            <div className="avatar">
              <a href="/profilePicture"><img src={`${currentUserImage}`} alt="avatar" ></img></a>
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )
      }
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  background-color: #006400;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding 5px;
    &::-webkit-scrollbar {
      width: 0.1rem;
      &-thumb {
        background-color: dark-green;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: green;
      min-height: 5rem;
      cursor: pointer;
      width: 85%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #55a630;
    }
  }
  .current-user {
    background-color: #008000;
    display: flex;
    padding-left: 6%;
    justify-content: left;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  `;
  
  export default Contacts;
  