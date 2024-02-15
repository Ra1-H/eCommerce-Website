import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCommerceStore } from "../../store";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const {
    setToken,
    setUserName,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
  } = useCommerceStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [userEmail, userPassword]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userEmail || !userPassword) {
      setError("Please enter email and password!");
    }

    setLoading(true);

    try {
      const userData = {
        email: userEmail,
        password: userPassword,
      };

      const response = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        userData
      );

      const authorizedToken = response.data.token;
      console.log(response);

      setToken(authorizedToken);
      setUserName(response.data.username);
      setUserPassword("");
      navigate("/home");

    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
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
          <label htmlFor="login-user-email" style={{ color: "#a6a6a6" }}>
            Email
          </label>
          <input
            className="form-inputs"
            type="text"
            name="login-user-email"
            autoComplete="userEmail"
            id="login-user-email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </span>

        <span className="form-span">
          <label htmlFor="login-user-pass" style={{ color: "#a6a6a6" }}>
            Password
          </label>
          <input
            className="form-inputs"
            type="password"
            name="login-user-pass"
            autoComplete="new-password"
            id="login-user-pass"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </span>

        <button
          onClick={handleSubmit}
          type="button"
          disabled={loading}
          className="form-button"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      {/* Link to the register page */}
      <div className="mt-4">
        If you don't have an account,{" "}
        <Link
          to="/auth/register"
          style={{ color: "gray", textDecoration: "underline" }}
        >
          Create One
        </Link>
      </div>
    </div>
  );
}

export default Login;
