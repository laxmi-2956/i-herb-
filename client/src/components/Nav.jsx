import React, { useState } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import NavDropdown from "../dropdownMenu/NavDropdown";
import "../css/nav.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);
  const cart = useSelector((cart) => cart.cart);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/productgrid/all?search=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">iHerb<sup>®</sup></span>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search all of iHerb"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FaSearch className="search-icon" onClick={handleSearch} />
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
          <FaUser className="user-icon" />
          <span className="account-dropdown">
            {user?.name ? <span className="user-text">Hi {user?.name} <br /></span> : ""} My Account ▼
          </span>
        </div>
        <Link to="/cart" style={{ color: "white" }}>
          <div className="cart">
            <FaShoppingCart />
            <span className="cart-count">{cart?.cartProduct?.length || 0}</span>
          </div>
        </Link>
      </div>

      {showDropdown && <NavDropdown />}
    </nav>
  );
};

export default Navbar;
