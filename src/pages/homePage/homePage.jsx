import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/navbar.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { BulletinBoard } from "../bulletinBoard/bulletinBoard.jsx";
import "./homePage.css";

// import { useDeleteBulletins } from "../../hooks/useDeleteBulletins.js";
// import { useGetBulletins } from "../../hooks/useGetBulletins.js";

import { useDeletePresence } from "../../hooks/useDeletePresence.js";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";

export const HomePage = () => {
  const { userID } = useGetUserInfo();
  // const { bulletins } = useGetBulletins();
  const navigate = useNavigate();

  // const signUserOut = async () => {
  //   try {
  //     await signOut(auth);
  //     localStorage.clear();
  //     useDeletePresence(userID);
  //     navigate("/login");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDeleteBulletins = async (event) => {
  //   event.preventDefault();
  //   useDeleteBulletins(bulletins);
  // };

  return (
    <div>
      <Navbar />
      <header className="header-section">
        <h1>Welcome to the Message Board</h1>
        <h2>Leave a message for everyone and see who's online</h2>
        {/* <button onClick={signUserOut}>Sign Out</button> */}
        {/* <button onClick={handleDeleteBulletins}>
          Delete Bulletins (For Debugging)
        </button> */}
      </header>
      <BulletinBoard />
      <Sidebar />
    </div>
  );
};
