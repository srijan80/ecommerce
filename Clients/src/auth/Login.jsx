import React, { useState } from "react";
import Form from "./components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const { email, password } = userData;

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: email,
          password,
        },
        {
          timeout: 5000,
        },
      );

      console.log(response.data);
      setMessage(response.data.message);
      localStorage.setItem("isUser", "true");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setMessage("Login failed");
    }
  };

  return <Form type="Login" onSubmit={handleLogin} />;
};

export default Login;
