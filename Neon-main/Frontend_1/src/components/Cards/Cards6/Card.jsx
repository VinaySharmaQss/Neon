import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Card6.module.css';
import { backendUrl } from '../../../utils/utils';

// Function to format dates
const formatDate = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    console.error("Invalid date:", date);
    return "Invalid Date"; // Fallback for invalid dates
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return parsedDate.toLocaleDateString(undefined, options);
};

const Card6 = ({ userId, placeId, booked, scheduled, eventStart, eventEnd }) => {
  console.log("Scheduled", eventEnd, eventStart);

  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  const [childrenDropdownOpen, setChildrenDropdownOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState('1 adult');
  const [selectedChildren, setSelectedChildren] = useState(0);
  const [dates, setDates] = useState({
    from: formatDate(eventStart), // Format eventStart
    to: formatDate(eventEnd), // Format eventEnd
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const amountPerAdult = 500;
  const amountPerChild = 300;

  const guestsRef = useRef(null);
  const childrenRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (guestsRef.current && !guestsRef.current.contains(event.target)) {
        setGuestsDropdownOpen(false);
      }
      if (childrenRef.current && !childrenRef.current.contains(event.target)) {
        setChildrenDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleGuestsDropdown = () => {
    setGuestsDropdownOpen((prev) => !prev);
    setChildrenDropdownOpen(false); // Close the other dropdown
  };

  const toggleChildrenDropdown = () => {
    setChildrenDropdownOpen((prev) => !prev);
    setGuestsDropdownOpen(false); // Close the other dropdown
  };

  const selectGuest = (guest) => {
    setSelectedGuests(guest);
    setGuestsDropdownOpen(false); // Close dropdown on selection
  };

  const selectChildren = (childCount) => {
    setSelectedChildren(childCount);
    setChildrenDropdownOpen(false); // Close dropdown on selection
  };

  const getGuestCounts = () => {
    const adults = parseInt(selectedGuests.split(' ')[0], 10);
    return { adults, children: selectedChildren };
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
      setErrorMessage('Failed to create payment. Please try again.');
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
      
      {(!booked && !scheduled) && (
        <>
          {/* Guests Dropdown */}
          <div className={styles.dropdownContainer} ref={guestsRef}>
            <label>Guests</label>
            <div className={styles.dropdown} onClick={toggleGuestsDropdown}>
              {selectedGuests} {selectedChildren > 0 && `+ ${selectedChildren} child${selectedChildren > 1 ? 'ren' : ''}`}
              <span className={styles.arrow}>{guestsDropdownOpen ? '▲' : '▼'}</span>
            </div>
            {guestsDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                {[...Array(7)].map((_, i) => (
                  <li key={i} onClick={() => selectGuest(`${i + 1} adult${i + 1 > 1 ? 's' : ''}`)}>
                    {i + 1} adult{i + 1 > 1 ? 's' : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Children Dropdown */}
          <div className={styles.dropdownContainer} ref={childrenRef}>
            <label>Children</label>
            <div className={styles.dropdown} onClick={toggleChildrenDropdown}>
              {selectedChildren} child{selectedChildren > 1 ? 'ren' : ''}
              <span className={styles.arrow}>{childrenDropdownOpen ? '▲' : '▼'}</span>
            </div>
            {childrenDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                {[...Array(4)].map((_, i) => (
                  <li key={i} onClick={() => selectChildren(i)}>
                    {i} child{(i > 1) && 'ren'}
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
            disabled={loading || getGuestCounts().adults === 0}
          >
            {loading ? 'Processing...' : 'Reserve my seats'}
          </button>
        </>
      )}

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
                <span>{selectedChildren} child(ren) x ₹{amountPerChild}</span>
                <span>₹{selectedChildren * amountPerChild}</span>
              </div>
            </div>

            <h4>Total: ₹{totalAmount()}</h4>

            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

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