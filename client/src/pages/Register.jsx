import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utilities/APIRoutes";

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
                navigate("/login"); 
            }
        }
    };

    return (
        <>
            <FormContainer>
             <div className="pagecontainer">
                <div className="formcontainer">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <h1 className="title">Chatland Register</h1>
                    </div>
                    <div className="logincontainer">
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
                    <br/>
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    <br/>
                    <button type="submit"> Register User </button>
                    </div>
                    <span className="notauser"> Already a user? <Link to="/login"> Login </Link></span> 
                </form>
                </div>
             </div>
            </FormContainer>
            <ToastContainer />
        </>
    )
};

const FormContainer = styled.div`
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap");

.pagecontainer {
    height: 100vh;
    width: 100vw;
    background-color: lightgreen;

}

.title{
    font-size: 40px;
    font-weight: 600;
    color: midnightblue;
    font-family: "EB Garamond", sans-serif;
}


.formcontainer {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);

    .logincontainer{
        display: flex;
        flex-direction: column;
    }
}
.notauser{
    color: midnightblue;
}

`;

export default Register;