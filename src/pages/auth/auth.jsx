import { auth, provider, storage } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./auth.css";

import { useAddPresence } from "../../hooks/useAddPresence";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const { addPresence } = useAddPresence();

  const addAuthToPresence = async (userID, displayName, photoURL) => {
    addPresence({
      userID,
      displayName,
      photoURL,
      isOnline: true,
    });
  };

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    // the user info that we want to keep recorded as an object
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };

    // set localstorage so the login stays consistent even after refreshes / closing tabs
    localStorage.setItem("auth", JSON.stringify(authInfo)); // you can't set localstorage as an object, so use JSON.stringify, turn back into an object in getUserDetails hook.

    addAuthToPresence(authInfo.userID, authInfo.name, authInfo.profilePhoto);
    // navigates from the auth page to the main expense-tracker app.
    navigate("/");
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-page">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-button" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// add profilePhoto to firebase Storage (FUNCTION THIS OUT)
// if (authInfo.profilePhoto) {
//   try {
//     const storageRef = ref(storage, `profile_photos/${authInfo.userID}`);
//     const response = await uploadBytes(
//       storageRef,
//       await fetch(authInfo.profilePhoto).then((res) => res.blob())
//     );
//     const downloadURL = await getDownloadURL(response.ref);

//     // Update user profile with the new profile photo URL
//     await updateProfile(auth.currentUser, { photoURL: downloadURL });

//     authInfo.profilePhoto = downloadURL;
//   } catch (error) {
//     console.error("Error uploading profile photo:", error.message);
//   }
// }
