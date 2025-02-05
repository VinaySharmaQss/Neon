import React from "react";
import styles from "./Navbar.module.css";
import NavbarItem from "../../UI/NavbarItem";
import { IoIosNotifications, IoIosMenu } from "react-icons/io";
import { RiGlobalLine } from "react-icons/ri";
import Logo from "../../../assets/img/logo2.png";
import ProfileMenu from "../../UI/ProfileMenu";
import { useState } from "react";
import LanguagueMenu from "../../UI/LanguagueMenu";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleLang() {
    setMenuOpen(!menuOpen);
  }
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img className="w-auto h-16 object-cover" src={Logo} alt="" />
      </div>

      <div className={styles.right_section}>
        <div className={styles.nav_items}>
         <NavLink to="/"
         className={({isActive}) => isActive ? styles.active : ''}>
         <NavbarItem >Dashboard</NavbarItem>
         </NavLink>
        
         <NavLink to="/faviorates"
         className={({isActive}) => isActive ? styles.active : ''}>
         <NavbarItem >Faviorates</NavbarItem>
         </NavLink>

         <NavLink to="/upcoming-events"
         className={({isActive}) => isActive ? styles.active : ''}>
         <NavbarItem >Upcoming events</NavbarItem>
         </NavLink>
        </div>

        <div className={styles.nav_icons}>
          <div className={styles.bell_icon}>
            <IoIosNotifications />
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
                <ProfileMenu isOpen={isOpen} />
                C
              </button>
            </div>
          </div>
          <div className={styles.global}>
            <RiGlobalLine onClick={toggleLang} />
            <LanguagueMenu isOpen={menuOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;