import React, { useEffect, useState } from 'react'
import { useCommerceStore } from '../../store'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const { setToken,userName,
    setUserName,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userConfirmPassword,
    setUserConfirmPassword, } = useCommerceStore();

    const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setError(null);
  }, [userName, userEmail, userPassword, userConfirmPassword]);

  const navigate = useNavigate();



  const handleSubmit = async () => {
    if (!userName || !userEmail || !userPassword || !userConfirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (userPassword !== userConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name:userName,
        email:userEmail,
        password:userPassword
      };

      const response = await axios.post(
        "http://localhost:3001/api/v1/users/register",
        userData
      );

      setToken(response.data.token);
      navigate("/auth/login");

    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (
     <div className="register form-container">
      <form className="form">
        {error && <span style={{ color: "red" }}>{error}</span>}

        <span className="form-span">
          <label htmlFor="user-name" style={{ color: "#a6a6a6" }}>
            username
          </label>
          <input
            className="form-inputs"
            type="text"
            name="user-name"
            autoComplete="username"
            id="user-name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </span>
        <span className="form-span">
          <label htmlFor="register-user-email" style={{ color: "#a6a6a6" }}>
            email
          </label>
          <input
            className="form-inputs"
            type="text"
            name="register-user-email"
            autoComplete="userEmail"
            id="register-user-email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </span>
        <span className="form-span">
          <label htmlFor="register-user-pass" style={{ color: "#a6a6a6" }}>
            password
          </label>
          <input
            className="form-inputs"
            type="password"
            name="register-user-pass"
            autoComplete="new-password"
            id="register-user-pass"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </span>
        <span className="form-span">
          <label
            htmlFor="confirm-register-user-pass"
            style={{ color: "#a6a6a6" }}
          >
            confirm password
          </label>
          <input
            className="form-inputs"
            type="password"
            name="confirm-register-user-pass"
            id="confirm-register-user-pass"
            autoComplete="new-password"
            value={userConfirmPassword}
            onChange={(e) => {
              setUserConfirmPassword(e.target.value);
            }}
            
          />
        </span>
        <button
          onClick={handleSubmit}
          type="button"
          disabled={loading}
          className="form-button"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Link to the login page */}
      <div className="mt-4">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          style={{ color: "gray", textDecoration: "underline" }}
        >
          Login here
        </Link>
      </div>
    </div>
  )
}

export default Register