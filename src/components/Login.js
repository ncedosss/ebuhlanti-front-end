import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setAuth({});
    if (user.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: password,
      });
      setSuccess(true);
      const role = response?.data?.role;
      setAuth({ user, password, role });
      setUser("");
      setPassword("");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (!error.response) {
        setErrorMessage("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMessage("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrorMessage("Unauthorised");
      } else {
        setErrorMessage("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        // <Dashboard /> // Render Dashboard when login is successful
        <div></div>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errorMessage ? "errorMessage" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            ></input>

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>
            <button>Sign In</button>
          </form>
          <p>
            Need an account?
            <br />
            <span className="line">
              {/* <a href="#">Sign Up</a> */}
              <Link to="/register">Register</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
