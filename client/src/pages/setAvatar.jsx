import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utilities/APIRoutes";
import { Buffer } from "buffer";


export default function SetAvatar() {
    const api = "https://api.multiavatar.com/4645646";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (!localStorage.getItem("loggedInUser"))
          navigate("/login");
      }, []);

    const setProfilePicture = async () => {
       
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);

        } else {
            const user = await JSON.parse(localStorage.getItem("loggedInUser"));
            console.log("This is the user from our localStorage: ", user);

            const { data } = await axios.post(`${setAvatarRoute}/${user[0]._id}`, { image: avatars[selectedAvatar] }, { withCredentials: true });
            
            console.log(data)

        if(data.status === false) {
            toast.error("Error!")
        };

        if (data.status === true) {

            user.isAvatarImageSet = true;
            user.avatarImage = data.image;

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            console.log("This is the new user after avatar: ", user);
            console.log(data.image);

            toast.success("Profile Avarar Picture changed");

        }

        else {
            toast.success(`Unable to set Avatar to ${data.user.username}`, toastOptions);
        }
            
    }
};

    useEffect(() => {
        async function fetchData() {
            const data = [];
            for (let i = 0; i < 1; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
        }
        fetchData();
    }, []);

    return (
        <>

            <Container>
                <div className="title-container">
                    <h1>Pick an Avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar, index) => {
                        return (
                            <div
                                className={`avatar ${selectedAvatar === index ? "selected" : ""
                                    }`}
                            >
                                <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    key={avatar}
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                <button onClick={setProfilePicture} className="submit-btn">
                    Set as Profile Picture
                </button>
                <ToastContainer />
            </Container>
        </>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;