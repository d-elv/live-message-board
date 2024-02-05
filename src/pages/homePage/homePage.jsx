import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/navbar.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { BulletinBoard } from "../bulletinBoard/bulletinBoard.jsx";
import "./homePage.css";

// import { useDeleteBulletins } from "../../hooks/useDeleteBulletins.js";
// import { useGetBulletins } from "../../hooks/useGetBulletins.js";

import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";

export const HomePage = () => {
  const { isAuth } = useGetUserInfo();
  const navigate = useNavigate();

  // const handleDeleteBulletins = async (event) => {
  //   event.preventDefault();
  //   useDeleteBulletins(bulletins);
  // };

  useEffect(() => {
    // Checks user is logged in
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <header className="header-section">
        <h1>Welcome to the Message Board</h1>
        <h2>Leave a message for everyone and see who's online</h2>
        {/* <button onClick={handleDeleteBulletins}>
          Delete Bulletins (For Debugging)
        </button> */}
      </header>
      <BulletinBoard />
      <Sidebar />
    </div>
  );
};
