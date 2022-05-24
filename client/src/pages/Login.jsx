import React, {useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { loginRoute } from '../utilities/APIRoutes';

function Login() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async (event) => {
        // preventDefault, hvad er det?
        event.preventDefault();
        // kald if(handleValidation) istedet for alert 
        // Snak med backend hvis validation er korrekt
        const {username, password} = values;
        const {data} = await axios.post(loginRoute, {
            username,
            password
        });

        // if(data.status === false) {
        //     console.log(data.msg, " This is data status if it fails")
        // }
        
        // if(data.status === true) {
        //     console.log(data.msg, " This is data status if success")
            
        // }

        navigate("/register");

    };

    const handleValidation = () => {
        const {username, password} = values;
    
                   
    };

    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value });
    };

  return (
    <>
    <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
                <h1>Chatland Login</h1>
            </div>
            <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
            <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
            <button type='submit'> Login </button>
            {/* <span> Not a User? <Link to="/register"> Register </Link></span> */}
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
};

const FormContainer = styled.div``;

export default Login