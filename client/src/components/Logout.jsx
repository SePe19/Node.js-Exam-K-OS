import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import { useCookies } from "react-cookie";



export default function Logout() {

    const navigate = useNavigate();
    const [getCookie, removeCookie] = useCookies([]);

    const userLogout = async () => {
        removeCookie("jwt");
        localStorage.clear();
        navigate("/login")
      };
      
  return (
    <Button>
        <BiPowerOff onClick={userLogout}/>
    </Button>
  )
}

const Button = styled.button`display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #00FF00;
border: none;
cursor: pointer;
svg {
  font-size: 1.3rem;
  color: black;
}`;
