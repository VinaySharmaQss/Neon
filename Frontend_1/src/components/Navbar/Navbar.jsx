import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

const Navbar = () => {
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notification.notifications);
  const user = useSelector((state) => state.user?.user) || JSON.parse(localStorage.getItem("user")) || {};
  const isSignup = useSelector((state) => state.user?.isSignup) ?? (localStorage.getItem("isSignup") === "true");
  const isOpens = useSelector((state) => state.user?.isNotification) || false;
  const isLogin = useSelector((state) => state.user?.isLogin) || (localStorage.getItem("isLogin") === "true") || false;

  const userName = user?.name || "Charlie";
  const name = userName.trim().slice(0, 1).toUpperCase();

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => setMenuOpen(!menuOpen);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleNotificationModal = () => dispatch(toggleNotification());

  return (
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
            {/* ✅ Notification Bell */}
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
                          {data.message}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className={styles.buttonContainer}>
                    <button className={styles.rescheduleButton}>Reschedule</button>
                    <button className={styles.cancelButton}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Profile Menu */}
            <div className={styles.profile}>
              <div className={styles.menu}>
                <IoIosMenu />
              </div>
              <div className="profile-img relative">
                <button
                  onClick={toggleMenu}
                  className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  {name}
                </button>
                <ProfileMenu isOpen={isOpen} />
              </div>
            </div>

            {/* ✅ Language Menu */}
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
    </nav>
  );
};

export default Navbar;
