import './App.css';
import io from "socket.io-client";
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:8080")

function App() {

  const [username, setUsername] = useState("")
  const [chatroom, setChatroom] = useState("")

  const joinChatroom = () => {
    if(username !== "" && chatroom !== "") {
        socket.emit("join_chatroom", chatroom);
    }
  }

  return (
    <div className="joinChatContainer">
    <div className="App">
      <h3>Chatroom</h3>
      <input 
      type="text" 
      placeholder="User" 
      onChange={(event) => {
        setUsername(event.target.value)
        }} 
        />
      <input
       type="text"
        placeholder="Chatroom Name"
        onChange={(event) => {
           setChatroom(event.target.value)
           }} 
           />
          <button onClick={joinChatroom}>Join a chatroom</button>
          </div>

      <Chat socket={socket} username={username} chatroom={chatroom} />
    </div>
  );
}

export default App;
