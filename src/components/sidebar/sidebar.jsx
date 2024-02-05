import { useState } from "react";
import { UserPresence } from "../userPresence/userPresence";
import "./sidebar.css";

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openCloseSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };
  return (
    <div className={sidebarOpen ? "sidebar-open" : "sidebar-closed"}>
      <div className="popout-arrow">
        <button className="open-button" onClick={openCloseSidebar}>
          ⇋
        </button>
        <div
          className={
            sidebarOpen ? "sidebar-content-visible" : "sidebar-content-hidden"
          }
        >
          <h2 className="online-users-heading">Online users</h2>
          <UserPresence />
        </div>
      </div>
    </div>
  );
};
