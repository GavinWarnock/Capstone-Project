import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>The Tabletop</b>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <h3>Profile</h3>
          </Link>
        </li>
        <div>
          <Link to="/my_groups">
            <h3>My Groups</h3>
            </Link>
        </div>
        <div>
          <Link to="/search">
            <h3>Search</h3>
          </Link>
        </div>
        <div>
          <Link to="/">
            <h3>Home</h3>
          </Link>
        </div>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
