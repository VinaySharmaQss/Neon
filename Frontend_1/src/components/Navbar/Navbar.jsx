import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosNotifications, IoIosMenu } from "react-icons/io";
import { RiGlobalLine } from "react-icons/ri";
import Logo from "../../../assets/img/logo2.png";
import ProfileMenu from "../../UI/ProfileMenu";
import LanguagueMenu from "../../UI/LanguagueMenu";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GiCancel } from "react-icons/gi";
import { TbBellRinging2Filled } from "react-icons/tb";
import { toggleNotification } from "../../redux/features/user";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector((state) => state.notification.notifications);
  const user = useSelector((state) => state.user?.user) || JSON.parse(localStorage.getItem("user")) || {};
  const isSignup = useSelector((state) => state.user?.isSignup) ?? (localStorage.getItem("isSignup") === "true");
  const isOpens = useSelector((state) => state.user?.isNotification) || false;
  const isLogin = useSelector((state) => state.user?.isLogin) || (localStorage.getItem("isLogin") === "true") || false;

  const userName = user?.name || "Charlie";
  const name = userName.trim().slice(0, 1).toUpperCase();

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isReschedulePopupOpen, setIsReschedulePopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);

  const toggleLang = () => setMenuOpen(!menuOpen);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleNotificationModal = () => dispatch(toggleNotification());

  const openReschedulePopup = () => (setIsReschedulePopupOpen(true));
  const closeReschedulePopup = () => setIsReschedulePopupOpen(false);

  const openCancelPopup = () => setIsCancelPopupOpen(true);
  const closeCancelPopup = () => setIsCancelPopupOpen(false);

  const handleRescheduleConfirm = () => {
    closeReschedulePopup();
    navigate(`/recommendations/${notifications[0]?.placeId}`)
    toast.success("Event rescheduled successfully!");
  };

  const handleCancelConfirm = () => {
    closeCancelPopup();
    console.log(notifications[0]);
    navigate(`/reschedules/${notifications[0]?.placeId}`)
    toast.success("Event cancelled successfully!");
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes popup {
            from { opacity: 0; transform: translateY(-30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>

      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo" />
        </div>

        <div className={styles.right_section}>
          <div className={styles.nav_items}>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
              <div className={styles.navItem}>Dashboard</div>
            </NavLink>

            <NavLink to="/faviorates" className={({ isActive }) => (isActive ? styles.active : "")}>
              <div className={styles.navItem}>My Favorites</div>
            </NavLink>

            <NavLink to="/upcoming-events" className={({ isActive }) => (isActive ? styles.active : "")}>
              <div className={styles.navItem}>Upcoming Events</div>
            </NavLink>
          </div>

          {isLogin ? (
            <div className={styles.nav_icons}>
              <div className={styles.bell_icon}>
                <button className={styles.bellButton} onClick={toggleNotificationModal}>
                  <IoIosNotifications />
                </button>
                {isOpens && (
                  <div className={styles.notificationModal}>
                    <div className={styles.modalHeader}>
                      <span className={styles.title}>
                        Hey {userName} <TbBellRinging2Filled size={16} />
                      </span>
                      <button className={styles.closeButton} onClick={toggleNotificationModal}>
                        <GiCancel />
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <p>No new notifications</p>
                    ) : (
                      <ul className={styles.notificationList}>
                        {notifications.map((data, index) => (
                          <li key={index} className={styles.notificationItem}>
                            {console.log(data)}
                            "{data.message}"
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className={styles.buttonContainer}>
                      <button className={styles.rescheduleButton} onClick={openReschedulePopup}>
                        Reschedule
                      </button>
                      <button className={styles.cancelButton} onClick={openCancelPopup}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.profile} onClick={toggleMenu}>
                <div className={styles.menu}>
                  <IoIosMenu />
                </div>
                <div className="profile-img relative">
                  <button className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {name}
                  </button>
                  <ProfileMenu isOpen={isOpen} />
                </div>
              </div>

              <div className={styles.global}>
                <RiGlobalLine onClick={toggleLang} className="text-sm cursor-pointer" />
                <LanguagueMenu isOpen={menuOpen} />
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <NavLink
                to="/auth/login"
                className="px-5 py-2 text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/signup"
                className="px-5 py-2 text-sm font-semibold text-white bg-black border border-black rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {isReschedulePopupOpen && (
          <Popup
            title={`Hey ${userName}`}
            message="Are you sure you want to reschedule this event?"
            onConfirm={handleRescheduleConfirm}
            onCancel={closeReschedulePopup}
            confirmText="Yes, Reschedule"
          />
        )}

        {isCancelPopupOpen && (
          <Popup
            title={`Hey ${userName}`}
            message="Are you sure you want to cancel this event?"
            onConfirm={handleCancelConfirm}
            onCancel={closeCancelPopup}
            confirmText="Yes, Cancel"
          />
        )}
      </nav>
    </>
  );
};

const Popup = ({ title, message, onConfirm, onCancel, confirmText }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
   style={
    {
      fontFamily:"BrownRegular"
    }
   }>
    <div
      className="bg-white rounded-2xl p-8 w-full max-w-lg mx-auto shadow-2xl border border-gray-300"
      style={{ animation: "popup 0.4s ease-out" }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-8">{message}</p>
      <div className="flex justify-end gap-4">
        <button onClick={onConfirm} className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
          {confirmText}
        </button>
        <button onClick={onCancel} className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all">
          No, thanks
        </button>
      </div>
    </div>
  </div>
);

export default Navbar;
