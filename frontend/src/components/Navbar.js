import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Assuming you have a CSS file named Navbar.css for styling
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Navbar = ({ role, homeLink }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={homeLink}>
          <img src="ssn.ico" alt="Logo" />
        </Link>
      </div>
      <div className="navbar-items">
        <div className="navbar-links">
          <Link to={homeLink} className="navbar-item">
            Home
          </Link>
          {role !== "security" ? (
            <Link to="/history" className="navbar-item">
              History
            </Link>
          ) : (
            <Link to="/history" className="navbar-item">
              Register
            </Link>
          )}
          {role === "student" && (
            <Link to="/apply" className="navbar-item">
              Apply
            </Link>
          )}
        </div>
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropdown-button" onClick={toggleDropdown}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
              alt="Profile"
              className="profile-icon"
            />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {/* <div className="dropdown-item">Profile</div> */}
              <div className="dropdown-item" onClick={logoutHandler}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
