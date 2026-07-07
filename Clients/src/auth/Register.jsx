import React, { useState } from "react";
import Form from "./components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      const { email, password } = userData;

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
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
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setMessage("Registration failed");
    }
  };

  return <Form type="Register" onSubmit={handleRegister} />;
};

export default Register;
