import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";



function Secret() {
  
  const nav = useNavigate();
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
      nav("/login");
    }  

    else {
    const { data } = await axios.post("http://localhost:8080/", {}, { withCredentials: true });
    console.log(data)

    if(data.status === false) {
      removeCookie("jwt");
      nav("/login");
    };

    if (data.status === true) {
      toast.success(`Hey ${data.user.username}, welcome to the Secret Page`, toastOptions);
    };
  }
  };

verifyUserCookie();
}, [getCookie, nav, removeCookie]);

const Logout = () => {
  removeCookie("jwt");
  nav("/login")
};

return (
  <>
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={Logout}>Log out</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Secret