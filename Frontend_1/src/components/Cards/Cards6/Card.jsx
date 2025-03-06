import React, { useState } from 'react';
import axios from 'axios';
import styles from './Card6.module.css';
import { backendUrl } from '../../../utils/utils';

const Card6 = ({ userId, placeId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState('1 adult');
  const [dates, setDates] = useState({ from: 'Nov 10, 2022', to: 'Nov 29, 2022' });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const amountPerAdult = 500;
  const amountPerChild = 300;
  const children = 0;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectGuest = (guest) => {
    setSelectedGuests(guest);
    setDropdownOpen(false);
  };

  const getGuestCounts = () => {
    const adults = parseInt(selectedGuests.split(' ')[0], 10);
    return { adults, children };
  };

  const totalAmount = () => {
    const { adults, children } = getGuestCounts();
    return adults * amountPerAdult + children * amountPerChild;
  };

  const handleReserveSeats = async () => {
    setLoading(true);
    const { adults, children } = getGuestCounts();

    try {
      const response = await axios.post(`${backendUrl}payments/create-payment`, {
        userId: parseInt(userId, 10),
        placeId: parseInt(placeId, 10),
        amountAdults: amountPerAdult,
        amountChildren: amountPerChild,
        quantityAdults: adults,
        quantityChildren: children,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to create payment. Please try again.');
    } finally {
      setLoading(false);
      setShowPopup(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.timeRange}>10:30 AM - 7:30 PM</div>

      <div className={styles.dateContainer}>
        <div className={styles.dateField}>
          <input type="text" value={dates.from} readOnly placeholder=" " />
          <label>From</label>
        </div>
        <div className={styles.dateField}>
          <input type="text" value={dates.to} readOnly placeholder=" " />
          <label>To</label>
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
            {[...Array(7)].map((_, i) => (
              <li key={i} onClick={() => selectGuest(`${i + 1} adult${i + 1 > 1 ? 's' : ''}`)}>
                {i + 1} adult{i + 1 > 1 ? 's' : ''}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.seatsInfo}>
        {100 + Math.floor(Math.random() * 10)} Seats still available
      </div>

      <button
        className={styles.reserveButton}
        onClick={() => setShowPopup(true)}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Reserve my seats'}
      </button>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Confirm Your Booking</h3>

            <div className={styles.popupContent}>
              <div className={styles.popupRow}>
                <span>Guests:</span>
                <span>{selectedGuests}</span>
              </div>
              <div className={styles.popupRow}>
                <span>{getGuestCounts().adults} adult(s) x ₹{amountPerAdult}</span>
                <span>₹{getGuestCounts().adults * amountPerAdult}</span>
              </div>
              <div className={styles.popupRow}>
                <span>{children} child(ren) x ₹{amountPerChild}</span>
                <span>₹{children * amountPerChild}</span>
              </div>
            </div>

            <h4>Total: ₹{totalAmount()}</h4>

            <div className={styles.popupActions}>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button onClick={handleReserveSeats} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm & Pay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card6;
