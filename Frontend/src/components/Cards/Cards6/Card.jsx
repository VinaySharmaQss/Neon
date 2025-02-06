// Import React and CSS module
import React, { useState } from 'react';
import styles from './Card6.module.css';

const Card6 = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState('1 adult');
  const [dates, setDates] = useState({ from: 'Nov 10, 2022', to: 'Nov 29, 2022' });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectGuest = (guest) => {
    setSelectedGuests(guest);
    setDropdownOpen(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.timeRange}>10:30 AM - 7:30 PM</div>
      <div className={styles.dateContainer}>
        <div className={styles.dateField}>
          <label>From</label>
          <input type="text" value={dates.from} readOnly />
        </div>
        <div className={styles.dateField}>
          <label>To</label>
          <input type="text" value={dates.to} readOnly />
        </div>
      </div>
      <div className={styles.dropdownContainer}>
        <label>Guests</label>
        <div className={styles.dropdown} onClick={toggleDropdown}>
          {selectedGuests}
          <span className={styles.arrow}>{dropdownOpen ? '\u25B2' : '\u25BC'}</span>
        </div>
        {dropdownOpen && (
          <ul className={styles.dropdownMenu}>
            <li onClick={() => selectGuest('1 adult')}>1 adult</li>
            <li onClick={() => selectGuest('2 adults')}>2 adults</li>
            <li onClick={() => selectGuest('3 adults')}>3 adults</li>
          </ul>
        )}
      </div>
      <div className={styles.seatsInfo}>172 Seats still available</div>
      <button className={styles.reserveButton}>Reserve my seats</button>
    </div>
  );
};

export default Card6;
