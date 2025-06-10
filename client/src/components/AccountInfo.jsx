import React, { useEffect, useState } from "react";
import "../css/AccountInfo.css";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaLock,
  FaGlobe,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const AccountInfo = () => {
  const authUser = useSelector((store) => store.auth.user);
  const [user, setUser] = useState(authUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const getUser = async () => {
    if (!authUser?._id) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/user/getuser/${authUser._id}`,
        { withCredentials: true }
      );
      setUser(res.data);
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [authUser?._id]);

  const latestAddress =
    user?.address?.length > 0 ? user.address[user.address.length - 1] : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/api/user/updateUserdata/${authUser._id}`,
        formData,
        { withCredentials: true }
      );
      alert("User updated successfully");
      setIsEditing(false);
      setUser(res.data.updatedUser); // Update display
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="accont-container">
      <div className="login-box">
        <div className="account-section">
          <h2>Account information</h2>

          <div className="account-item">
            <FaUser className="icon" />
            <span>Full Name</span>
            <span>{user?.name || "Not provided"}</span>
          </div>

          <div className="account-item">
            <FaEnvelope className="icon" />
            <span>Email</span>
            <span className="masked">{user?.email || "Not provided"}</span>
          </div>

          <div className="account-item">
            <FaMobileAlt className="icon" />
            <span>Mobile number</span>
            <span>{user?.phone || "Not provided"}</span>
          </div>

          <div className="account-item">
            <FaLock className="icon" />
            <span>Password</span>
            <span className="masked">********</span>
          </div>

          {latestAddress && (
            <div className="account-item">
              <FaGlobe className="icon" />
              <span>Latest Address</span>
              <span>
                {latestAddress.address1}, {latestAddress.colony},{" "}
                {latestAddress.state}, {latestAddress.zip}
              </span>
            </div>
          )}

          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Update Data"}
          </button>

          {isEditing && (
            <form onSubmit={handleSubmit} className="edit-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <button type="submit">Save Changes</button>
            </form>
          )}

          <div className="delete-link">
            <a href="#">Delete your iHerb account &gt;</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
