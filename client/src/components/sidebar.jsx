import React from "react";
import "../css/dashboard.css";
import { useSelector } from "react-redux";

const Sidebar = ({ setActivePage }) => {





  return (
    <div className="sidebar">

      <ul>
        <li onClick={() => setActivePage("dashboard")}>My Account</li>
        <li onClick={() => setActivePage("orders")}>Orders</li>
        <li onClick={()=>setActivePage("account")}>Account Information</li>
        <li onClick={() => setActivePage("address")}>Address Book</li>
        <li>Payment Methods</li>
        <li onClick={() => setActivePage("lists")}>My Lists</li>
      </ul>

      <h4>Credits & Savings</h4>
      <ul>
        <li>My Rewards</li>
        <li>Store Credits</li>
        <li>Sales & Offers</li>
      </ul>

      <h4>My Activity</h4>
      <ul>
        <li>My Page</li>
        <li>My Reviews</li>
        <li>My Questions</li>
        <li>My Answers</li>
      </ul>

      <h4>Settings</h4>
      <ul>
        <li>Communications</li>
        <li>2-Step Verification</li>
        <li>Passkey</li>
      </ul>
    </div>
  );
};

export default Sidebar;
