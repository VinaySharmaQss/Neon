import React, { useEffect, useState } from "react";
import styles from "./Cards7.module.css"; // Make sure your styles are correct

const EventCard = ({ eventTitle, eventLocation, eventDate, eventImage }) => {
  const calculateTimeLeft = () => {
    const eventDateObj = new Date(eventDate);
    const now = new Date();
    const difference = eventDateObj - now;

    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <div className={styles.card} style={{ backgroundImage: `url(${eventImage})` }}>
      <div className={styles.overlay}>
        <h2 className={styles.title}>{eventTitle}</h2>
        <p className={styles.location}>{eventLocation}</p>
        <p className={styles.date}>{new Date(eventDate).toLocaleString()}</p>
        
        {/* Countdown Timer */}
        <div className={styles.countdown}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className={styles.timerBox}>
              <p>{unit.toUpperCase()}</p>
              <span>{value}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className={styles.button}>Yes, I am in</button>
      </div>
    </div>
  );
};

export default EventCard; // Make sure this is properly named if it's the correct one
