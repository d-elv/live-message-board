import { useState } from "react";
import { storage } from "../../config/firebase-config.js";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./updateProfilePicture.css";

export const UpdateProfilePicture = () => {
  const { userID, profilePhoto } = useGetUserInfo();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const authData = JSON.parse(localStorage.getItem("auth")) || {};
    const storageRef = storage.ref(`profile_photos/${userID}/${file.name}`);
    const uploadTask = storageRef.put(file);
    console.log(authData);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking if needed
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle errors
        console.error("Error uploading file:", error);
      },
      () => {
        // Upload success
        storageRef.getDownloadURL().then((downloadURL) => {
          // Update user's photoURL in the authentication system
          user
            .updateProfile({
              photoURL: downloadURL,
            })
            .then(() => {
              // Update successful
              console.log("Profile picture updated successfully!");

              // Update photoURL in localStorage
              updateAuthData({
                ...JSON.parse(localStorage.getItem("authData")),
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              // Handle errors
              console.error("Error updating profile picture:", error);
            });
        });
      }
    );
  };

  return (
    <div>
      <h1>Profile Picture Update</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
