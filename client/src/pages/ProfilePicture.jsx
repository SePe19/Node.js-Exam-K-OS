import axios from 'axios';
import styled from "styled-components";
import React, {useState, useEffect} from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { setAvatarRoute } from "../utilities/APIRoutes";



function ProfilePicture() {
    
  const [dogImage, setDogImage] = useState([])
  const [selectedImage, setSelectedImage] = useState([])
  const navigate = useNavigate();
  const [getCookie, removeCookie] = useCookies([]);


  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

useEffect(() => {
  const verifyUserCookie = async () => {
  if(!getCookie.jwt) {
    navigate("/login");
  }  
}
  verifyUserCookie();
}, []);

const setProfilePicture = async () => {
  
  if(selectedImage === undefined) {
    toast.error("Please select an image", toastOptions);
  }

  else {
    const user = await JSON.parse(localStorage.getItem("loggedInUser"));

    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, { image: dogImage[selectedImage] }, { withCredentials: true });

    if(data.status == false) {
      removeCookie("jwt");
      navigate("/login");
      toast.error("Error!")
    }

    if(data.status == true) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;

      localStorage.setItem("loggedInUser", JSON.stringify(user));

      toast.success("Profile Picture changed");

      navigate("/Chat");
    }
  }
};

  useEffect(() => {
    function fetchData() {
    fetch("https://dog.ceo/api/breeds/image/random/3")
    .then(response => response.json())
    .then(data => setDogImage(data.message))
    }
    fetchData();
  },[])

  return (
    <>
    <Container>
    <div className="avatars">
    {dogImage.map((dog, index) => {
      return (
        <div className={`avatar ${selectedImage === index ? "selected" : "" }`}>
          <img src={dog} alt="avatar" key={dog} onClick={() => setSelectedImage(index)} />
          </div>
      );
    })}
    </div>
    <button onClick={setProfilePicture} className="submit-btn"> Set Profile Picture </button>
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
      border-radius: 1rem;
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

export default ProfilePicture;