import React, { useState } from "react";
import "../css/login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signinerror,
  signinStart,
  signinSuccess,
} from "../redux/slice/authSlice";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user,isAuth  } = useSelector((store) => store.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      dispatch(signinStart());
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/user/signin`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(signinSuccess(res?.data?.rest));
      navigate("/");
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed.";
      dispatch(signinerror(message));
      console.log(err)
      setError(message);
    }
  };

  const googleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_BASEURL}/api/user/google`;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-left" onSubmit={handleSubmit}>
          <h2>Sign in or create an account</h2>
          <p>Enter your email or mobile number to get started.</p>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="continue-btn" type="submit">
            Continue
          </button>

          <div className="help-text">
            <Link to="/signup">Create account</Link>
          </div>

          <div className="or-divider">or</div>

          <button
            className="social-btn google"
            type="button"
            onClick={googleSignIn}
          >
            <FcGoogle className="icon" />
            Sign In with Google
          </button>

          <button className="social-btn facebook" type="button">
            <FaFacebookF className="icon" />
            Sign In with Facebook
          </button>

          <button className="social-btn apple" type="button">
            <FaApple className="icon" />
            Sign In with Apple
          </button>

          <p className="terms-text">
            By continuing, you’ve read and agree to our{" "}
            <span className="link">Terms and Conditions</span> and{" "}
            <span className="link">Privacy Policy</span>.
          </p>
        </form>

        <div className="login-right">
          <h3>Why iHerb?</h3>
          <ul className="features-list">
            <li>All temperature-controlled facilities to ensure quality</li>
            <li>Genuine reviews only from verified customers</li>
            <li>No third-party sales. Direct from suppliers and authorized distributors</li>
            <li>Independent lab testing on iHerb’s House Brands</li>
            <li>Expiration dates on product descriptions</li>
            <li>24/7 customer service. Easy returns and refunds.</li>
          </ul>

          <div className="ratings">
            <div>
              <strong>4.8 ★★★★★</strong>
              <br />
              iHerb
              <br />
              Store Reviews
            </div>
            <div>
              <strong>4.8 ★★★★★</strong>
              <br />
              Google
              <br />
              Customer Reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
