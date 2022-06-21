import React from 'react'
import styled from 'styled-components'

export default function Welcome({ currentUser }) {

  return (
    <Container>
      <img src="https://media.giphy.com/media/gi9umgLPuGxfJ4CfMo/giphy.gif"/>
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Please select a chat to begin</h3>
    </Container>
  )
}
const Container = styled.div`
background-color: #006400;
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: #00ff00;
}`;