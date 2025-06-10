import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "../css/otp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  otpVerificationerror,
  otpVerificationStart,
  otpVerificationSuccess,
} from "../redux/slice/authSlice";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const data = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {}, [data]);
  const navigate = useNavigate();
  const hendSubmit = async () => {
    dispatch(otpVerificationStart());
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/user/verify`,
        {
          otp,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(otpVerificationSuccess());

      navigate("/login");
    } catch (error) {
      dispatch(
        otpVerificationerror(error.response.data.message || "wrong otp")
      );
    }
  };
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "500px", width: "100%", borderRadius: "10px" }}
      >
        <h3 className="text-center mb-4">🔐 Verify Your OTP</h3>
        <p>{data.auth.error}</p>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "60px",
            height: "60px",
            fontSize: "24px",
            borderRadius: "8px",
            border: "1px solid #ced4da",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            color: "#495057",
            marginLeft: "10px",
          }}
          focusStyle={{
            outline: "none",
            border: "2px solid #007bff",
            backgroundColor: "#fff",
          }}
        />

        <button
          className="btn btn-primary mt-4 w-100"
          onClick={() => hendSubmit()}
          disabled={otp.length < 6}
          style={{
            fontSize: "18px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
}
