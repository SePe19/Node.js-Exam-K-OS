import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { loginRoute } from "../utilities/APIRoutes";


function Login() {
    
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

    useEffect(() => {
        if (localStorage.getItem(process.env.JWT_KEY)) {
            navigate("/chatroom");
        }
    }, [])

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value },{withCredentials:true})
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

        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
                headers: {
                    "Content-Type": "application/json"
                },
                
            }, { withCredentials: true });

            if (data.status === false) {
               toast.error(data.message, toastOptions )
            }

            if (data.status === true) {

                localStorage.setItem("loggedInUser", JSON.stringify(data.user));

                navigate("/Chat");
                console.log("This is the userRoute response: ", data);
                console.log("Print out data.token: ", data.token);
                console.log("Print out user in data.user: ", data.user);
                
            }
            
        }
    };
        
    
    return (
        <>
        
            <FormContainer>
            <div className="pagecontainer">
                <div className="formcontainer">
                <form  onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <h1 className="title">Chatland Login</h1>
                    </div>
                    <div className="logincontainer">
                    <input className="textinp" type="text" placeholder="Username" name="username" min="3" onChange={(e) => handleChange(e)} />
                    <br />
                    <input className="passwordinp" type="password" placeholder="Password" name="password" min="5" onChange={(e) => handleChange(e)} />
                    <br/>
                    <button className="submitbtn" type="submit"> Login </button>
                    </div>
                    <span className="notauser"> Not a User? <Link to="/register"> Register </Link></span> 
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

export default Login;