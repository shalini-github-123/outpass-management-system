import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import "./Login.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false); // New state for tracking error

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();
  // console.log(new Date());
  useEffect(() => {
    if (userInfo) {
      if (userInfo.id[0] === "S") navigate("/student");
      else if (userInfo.id[0] === "F") navigate("/faculty");
      else if (userInfo.id[0] === "W") navigate("/warden");
      else navigate("/security");
    }
  }, [history, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      setShowError(true); // Set showError to true when there is an error
    }
  }, [error]);

  return (
    <div className="entry-page">
      <form onSubmit={submitHandler}>
        <h2>Welcome Back!</h2>
        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </li>
            <li>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </li>
            <li style={{ display: "inline-block" }}>
              {showError && (
                <p
                  className="error"
                  style={{ color: "red", fontSize: "small",fontWeight:"bold" }}
                >
                  Wrong credentials! Please try again.
                </p>
              )}
            </li>
          </ul>
        </fieldset>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginScreen;
