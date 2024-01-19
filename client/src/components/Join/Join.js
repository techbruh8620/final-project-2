import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../../lib/Apis/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userState);

  const [loginUser, { error, isSuccess }] = useLoginUserMutation();

  const onLoginUser = async () => {
    if (!username || !password) {
      return;
    }
    return await loginUser({ username, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/chat");
    }
  }, [isSuccess]);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        {error?.data && <p style={{ color: "red" }}>{error?.data?.error}</p>}
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Username"
            className="joinInput"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            className="joinInput mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button className={"button mt-20"} type="submit" onClick={onLoginUser}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Join;
