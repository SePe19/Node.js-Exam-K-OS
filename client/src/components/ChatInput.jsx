import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

function ChatInput({handleSendMessage}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker); 
  };

  const handleEmojiSelect = (event, emojiObject) => {
    let userMessage = message;
    userMessage += emojiObject.emoji;
    setMessage(userMessage);
  };

  const sendChat = (event) => {
    event.preventDefault();

    if(message.length > 0 ) {
      handleSendMessage(message);
      setMessage("");
    }
  }
  return (
    <Container className="chatinput-container">
        <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}  />
          { showEmojiPicker && <Picker onEmojiClick={handleEmojiSelect} />}
        </div>
      </div>
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input className="input-placeholder" type="text" placeholder="Type Message Here" value={message} onChange={(event) => setMessage(event.target.value)} />
        <button className="submit">
            <IoMdSend />
        </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #006400;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: yellow;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    .input-placeholder {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #ffffff;
        opacity: 0.75;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #329a33;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: black;
      }
    }
  }
`;

export default ChatInput;