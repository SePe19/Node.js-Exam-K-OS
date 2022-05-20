import React, { useEffect, useState } from 'react';

function Chat({ socket, username, chatroom }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        chatroom: chatroom,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };


  //problem med beskeden blev logget 2 gange i consolen i browseren 
  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      console.log(data);
    })
  }, [socket]);

  //youtube kommentar med løsning. tilføjet socket.off i metoden ovenover ↥
  // useEffect(() => {
  //   socket.off("receive_message").on("receive_message", (data) => {

  //     setMessageList((list) => [...list, data]);
  //   });
  // }, [socket]);

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat