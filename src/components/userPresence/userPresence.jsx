import { useGetPresence } from "../../hooks/useGetPresence";
import "./userPresence.css";

export const UserPresence = () => {
  const { presentUsers } = useGetPresence();
  return (
    <div className="container">
      <ul className="users-list">
        {presentUsers.map((dbUser) => {
          const { userID, displayName, photoURL, index } = dbUser;
          return (
            <li
              key={userID}
              className={index % 2 === 0 ? "presence-even" : "presence-odd"}
            >
              <div className="present-user">
                {photoURL && <img className="user-photo" src={photoURL} />}
                <p className="user-name">{displayName}</p>
                <div className="glowing-circle"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
