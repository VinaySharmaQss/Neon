import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosNotifications, IoIosMenu } from "react-icons/io";
import { RiGlobalLine } from "react-icons/ri";
import Logo from "../../../assets/img/logo2.png";
import ProfileMenu from "../../UI/ProfileMenu";
import LanguagueMenu from "../../UI/LanguagueMenu";
import styles from "./Navbar.module.css";
import { Bell } from "lucide-react";
import { GiCancel } from "react-icons/gi";
import { TbBellRinging2Filled } from "react-icons/tb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(true);

  const toggleNotification = () => {
    setIsOpens(!isOpens);
  };
  function toggleLang() {
    setMenuOpen(!menuOpen);
  }

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>

      <div className={styles.right_section}>
        <div className={styles.nav_items}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <div className={styles.navItem}>Dashboard</div>
          </NavLink>

          <NavLink
            to="/faviorates"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <div className={styles.navItem}>My Faviorates</div>
          </NavLink>

          <NavLink
            to="/upcoming-events"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <div className={styles.navItem}>Upcoming events</div>
          </NavLink>
        </div>

        <div className={styles.nav_icons}>
          <div className={styles.bell_icon}>
           <button className={styles.bellButton} onClick={toggleNotification}>
           <IoIosNotifications  />
           </button>
           {isOpens && (
        <div className={styles.notificationModal}>
          <div className={styles.modalHeader}>
            <span className={styles.title}>Hey Charlie <TbBellRinging2Filled size={16} /></span>
            <button className={styles.closeButton} onClick={toggleNotification}>
              <GiCancel />
            </button>
          </div>
          <p >"We regret to inform you that the current weather conditions are not conducive for a golf session. Would you like to reschedule or cancel your golf session for today?"</p>
          <div className={styles.buttonContainer}>
            <button className={styles.rescheduleButton}>Reschedule</button>
            <button className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
          </div>
          <div className={styles.profile}>
            <div className={styles.menu}>
              <IoIosMenu />
            </div>
            <div className="profile-img relative">
              <button
                onClick={toggleMenu}
                className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                C
              </button>
              <ProfileMenu isOpen={isOpen} />
            </div>
          </div>
          <div className={styles.global}>
            <RiGlobalLine onClick={toggleLang} className="text-sm cursor-pointer" />
            <LanguagueMenu isOpen={menuOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;