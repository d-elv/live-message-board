import { Navbar } from "../../components/navbar/navbar";
import { UpdateProfilePicture } from "../../components/updateProfilePicture/updateProfilePicture";
import "./settings.css";

export const Settings = () => {
  return (
    <>
      <Navbar />
      <h1>Settings</h1>
      <UpdateProfilePicture />
    </>
  );
};
