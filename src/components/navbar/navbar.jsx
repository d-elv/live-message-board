import { Link } from "react-router-dom";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useDeletePresence } from "../../hooks/useDeletePresence.js";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export const Navbar = () => {
  const { userID } = useGetUserInfo();
  const navigate = useNavigate();

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      useDeletePresence(userID);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-bar-list">
        <li className="nav-bar-list-items">
          <Link to="/" className="nav-bar-links">
            Home
          </Link>
        </li>
        <li className="nav-bar-list-items">
          <Link to="/bulletin-board" className="nav-bar-links">
            Bulletin Board
          </Link>
        </li>
        {/* <li className="nav-bar-list-items">
          <Link to="/settings" className="nav-bar-links">
            Settings
          </Link>
        </li> */}
        <li className="nav-bar-list-items">
          <button className="sign-out-button" onClick={signUserOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};
