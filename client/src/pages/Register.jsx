import React, {useState, useEffect } from 'react'
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { registerRoute } from '../utilities/APIRoutes';

function Register() {

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async (event) => {
        // preventDefault, hvad er det?
        event.preventDefault();
        alert("Register Sent")
        // kald if(handleValidation) istedet for alert 
        // Snak med backend hvis validation er korrekt
        const {username, password} = values;
        const {data} = await axios.post(registerRoute, {
            username,
            password
        });
    };

    const handleValidation = () => {
        const {username, password} = values;
        
    //     if() { statement her
    //     toast.error("Username findes allerede", {
    //         toast options her
    //     })
    // }
                   
    };

    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value });
    };

  return (
    <>
    <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
                <h1>Chatland</h1>
            </div>
            <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
            <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
            <button type='submit'> Register User </button>
            {/* <span> Already a user? <Link to="/login"> Login </Link></span> */}
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
};

const FormContainer = styled.div``;

export default Register