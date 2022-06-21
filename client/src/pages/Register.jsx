import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { registerRoute } from '../utilities/APIRoutes';

function Register() {

    const navigate = useNavigate();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const { username, password } = values;

        if (username.length < 3) {
            toast.error("Username must be atleast 3 characters long", toastOptions);
            return false;
        } else if (password.length < 5) {
            toast.error("Password must be atleast 5 characters long", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        // preventDefault, hvad er det?
        event.preventDefault();

        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                password
            });

            if (data.status === false) {
                toast.error(data.message, toastOptions);
            }

            if (data.status === true) {
                navigate("/login") 
            }
        }
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <h1>Chatland Register</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    <button type='submit'> Register User </button>
                    <span> Already a user? <Link to="/login"> Login </Link></span> 
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
};

const FormContainer = styled.div``;

export default Register