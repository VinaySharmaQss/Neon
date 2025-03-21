import React, { useEffect, useState } from "react";
import styles from "./Cards7.module.css";
import { useNavigate } from "react-router";

const EventCard = ({
  name,
  reschedule = false,
  eventId,
  eventTitle,
  eventLocation,
  eventDate,
  eventImage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedSeats, setSelectedSeats] = useState(1);

  const navigate = useNavigate();

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

  const handleReschedule = () => {
    // Add your reschedule logic here
    console.log({
      selectedDate,
      selectedTimeSlot,
      selectedSeats,
    });
    setShowModal(false);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString(undefined, options);
  };

  const generateDateOptions = (baseDate) => {
    const dates = [];
    for (let i = 1; i <= 3; i++) {
      const newDate = new Date(baseDate);
      newDate.setDate(newDate.getDate() + i);
      dates.push(newDate);
    }
    return dates;
  };

  const dateOptions = generateDateOptions(eventDate);

  return (
    <>
      <div
        className={styles.card}
        style={{ backgroundImage: `url(${eventImage})` }}
      >
        <div className={styles.overlay}>
          <h2 className={styles.title}>{eventTitle}</h2>
          <p className={styles.location}>{eventLocation}</p>
         
        {
          !reschedule ? <p className={styles.date}>{formatDate(eventDate)} at {formatTime(eventDate)}</p>
          :<div>
           <p className={styles.date}>{formatDate(eventDate)}</p>
           <p className="mt-[-20px]">7:00 AM | 11:00 AM | 3:00 PM</p>
          </div>
        }
          {!reschedule && (
            <div className={styles.countdown}>
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className={styles.timerBox}>
                  <p>{unit.toUpperCase()}</p>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}

          {reschedule ? (
            <button
              className={styles.button}
              style={{marginTop:"-10px"}}
              onClick={() => setShowModal(true)}
            >
              Reschedule
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => navigate(`/event-details/${eventId}`)}
            >
              Yes, I am in
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        style={{
          fontFamily: "BrownRegular",
          backdropFilter: "blur(10px)"
        }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">
              Hey {name},
            </h2>
            <p className="mb-4 text-gray-700">
              You have chosen a new "{eventTitle}" event on{" "}
              {formatDate(eventDate)} at{" "}
              {formatTime(eventDate)}. Have a great day ahead
              and enjoy your new round of golf!
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Select a day
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                >
                  {dateOptions.map((date, index) => (
                    <option key={index} value={date.toISOString()}>
                      {formatDate(date)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Select a time slot
                </label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option>10:00 AM - 3:30 PM</option>
                  <option>4:00 PM - 8:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Select your seats
                </label>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option>1 seat</option>
                  <option>2 seats</option>
                  <option>3 seats</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => navigate(`/recommendations/${eventId}`)}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Reserve my seats
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;