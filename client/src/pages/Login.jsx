import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { loginRoute } from '../utilities/APIRoutes';
import { useCookies } from "react-cookie";

function Login() {

    const navigate = useNavigate();
    const [getCookie, removeCookie] = useCookies([]);

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
        setValues({ ...values, [event.target.name]: event.target.value }, { withCredentials: true })
    };

    const handleValidation = () => {
        const { username, password } = values;

        if (username === "") {
            toast.error("Username and Password is required", toastOptions);
            return false;

        } else if (password === "") {
            toast.error("Username and Password is required", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        // preventDefault, hvad er det?
        event.preventDefault();
        if (!getCookie.jwt) {
            toast.error("Not authorized ", toastOptions);
            navigate("/login");
        }
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            }, { withCredentials: true });

            if (data.status === false) {
                toast.error(data.message, toastOptions)
            }

            if (data.status === true) {
                navigate("/");
                console.log("Print out data.token: ", data.token);
                console.log("This ios userRoute response: ", data);
                console.log("Print out user in data.token: ", data.user);
            }

        }
    };


    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <h1>Chatland Login</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" min="3" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Password" name="password" min="5" onChange={(e) => handleChange(e)} />
                    <button type='submit'> Login </button>
                    <span> Not a User? <Link to="/register"> Register </Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
};

const FormContainer = styled.div``;

export default Login