import { useAddBulletin } from "../../hooks/useAddBulletin";
import { useGetBulletins } from "../../hooks/useGetBulletins.js";
import { useEffect, useState, useRef, createRef } from "react";
import "./bulletinBoard.css";
import { Navbar } from "../../components/navbar/navbar.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";

const getDayWithOrdinalSuffix = (day) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const relevantDigits = (day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10;
  return `${day}${suffixes[relevantDigits]}`;
};

const formatDate = (firebaseTimestamp) => {
  if (!firebaseTimestamp) {
    return;
  }
  const timestampDate = firebaseTimestamp.toDate();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDayOfMonth = currentDate.getDate();
  const timestampYear = timestampDate.getFullYear();
  const timestampMonth = timestampDate.getMonth();
  const timestampDayOfMonth = timestampDate.getDate();

  // logic for determining if the firebasetimestamp is before today or not.
  const isBeforeToday =
    timestampYear < currentYear ||
    (timestampYear === currentYear && timestampMonth < currentMonth) ||
    (timestampYear === currentYear &&
      timestampMonth === currentMonth &&
      timestampDayOfMonth < currentDayOfMonth);

  const dateTime = firebaseTimestamp.toDate().toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  const dayWithSuffix = getDayWithOrdinalSuffix(timestampDate.getDate());
  let finalFormattedDate;
  if (isBeforeToday) {
    finalFormattedDate = `${dayWithSuffix} ${dateTime.slice(2)}`;
    return finalFormattedDate;
  } else {
    finalFormattedDate = `today, ${dateTime.slice(7)}`;
    return finalFormattedDate;
  }
};

export const BulletinBoard = () => {
  const { isAuth } = useGetUserInfo();
  const navigate = useNavigate();
  const [bulletin, setBulletin] = useState("");
  const [navbarOn, setnavbarOn] = useState(false);
  const [visibleDates, setVisibleDates] = useState({});
  const [bulletinBoardHeight, setBulletinBoardHeight] = useState(400);
  const bulletinRefs = useRef([]);
  const inputFieldReference = useRef(null);

  const location = useLocation();
  const { bulletins } = useGetBulletins();
  const { addBulletin } = useAddBulletin();

  useEffect(() => {
    // Checks user is logged in
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const onSubmit = async (event) => {
    if (!bulletin) {
      inputFieldReference.current.focus();
      return;
    }
    event.preventDefault();
    addBulletin({
      bulletin,
    });
    setBulletin("");
  };

  const toggleDateVisibility = (bulletinID) => {
    setVisibleDates((previousVisibleDates) => ({
      ...previousVisibleDates,
      [bulletinID]: !previousVisibleDates[bulletinID],
    }));
  };

  const isThisHome = () => {
    if (location.pathname === "/") {
      setnavbarOn(false);
      setBulletinBoardHeight(400);
    } else {
      setnavbarOn(true);
      setBulletinBoardHeight(546);
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  };

  useEffect(() => {
    isThisHome();
  }, []);

  return (
    <div>
      {navbarOn ? <Navbar /> : <></>}
      <h1>Share Your Thoughts</h1>
      <div className="bulletins-container">
        <div
          className="bulletin-board"
          style={{ height: `${bulletinBoardHeight}px` }}
        >
          <ul className="sent-bulletins">
            {bulletins.map((dbBulletin, index) => {
              const { bulletin, id, createdAt, name } = dbBulletin;
              const formattedDate = formatDate(createdAt);
              const isDateVisible = visibleDates[id];

              if (!bulletinRefs.current[index]) {
                bulletinRefs.current[index] = createRef();
              }

              const isLastBulletin = index === bulletins.length - 1;

              const didNameChange =
                index === 0 || bulletins[index - 1].name !== name;

              const nameWillChange =
                (index < bulletins.length - 1 &&
                  bulletins[index + 1].name !== name) ||
                index === bulletins.length - 1;

              return (
                <div key={id}>
                  {didNameChange && (
                    <div className="bulletin-sender">{name}</div>
                  )}
                  <li key={id} className="list-item-bulletin">
                    <div
                      className={
                        isLastBulletin ? "bulletin last-bulletin" : "bulletin"
                      }
                    >
                      <div className="content-and-date-container">
                        <p
                          className={`bulletin-content ${
                            nameWillChange ? "end-of-batch" : ""
                          } ${didNameChange ? "start-of-batch" : ""}
                          }`}
                          onMouseOver={() => toggleDateVisibility(id)}
                          onMouseLeave={() => toggleDateVisibility(id)}
                        >
                          {bulletin}
                        </p>
                        <p
                          ref={bulletinRefs.current[index]}
                          className={`date-of-bulletin ${
                            isDateVisible ? "visible" : ""
                          }`}
                        >
                          {isDateVisible ? `sent ${formattedDate}` : ""}
                        </p>
                      </div>
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="type-bulletin-bar">
          <input
            ref={inputFieldReference}
            className="bulletin-input"
            type="text"
            placeholder="Write message here..."
            value={bulletin}
            onKeyDown={handleEnterKeyPress}
            onChange={(event) => {
              setBulletin(event.target.value);
            }}
          />
          <button className="send-bulletin-button" onClick={onSubmit}>
            {">"}
          </button>
        </div>
      </div>
      {navbarOn ? <Sidebar /> : <></>}
    </div>
  );
};

// TODO:
// Make it so that a user trying to sign in when their presence is already registered is accounted for
// 2) Prevent spam, only so many messages after so long... 5 messages within 5 seconds?
// 3) If multiple messages are sent by one person, bundle them together. Have name show at the top of the first of the batch.
// 4) Add formatting of messages. Markdown from freeCodeCamp lesson?
// 5) Add ability to upload custom profile pictures that are then displayed in userPresence

// DONE:
// 1) Prevent erroring when sending a message.
