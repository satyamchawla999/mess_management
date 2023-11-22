// src/components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../feature/user/authSlice";
import { notification } from "antd";

import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      openNotificationWithIcon("success",'Login successfull!')
      dispatch(login());
    } else {
      openNotificationWithIcon('error','Credentials not matched')
    }
  };

  return (
    <>
      {contextHolder}

      <div className="loginPageContainer">
        <div className="leftContainer">
          {/* <img src={require('../../assets/images/loginImage.png')} alt='#'/> */}
          <img
            src="https://www.chitkara.edu.in/blogs/wp-content/uploads/2022/04/What-makes.jpg"
            alt="*"
          />
        </div>

        <div className="rightContainer">
          <h1>Admin Login</h1>

          <form className="formSection" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
