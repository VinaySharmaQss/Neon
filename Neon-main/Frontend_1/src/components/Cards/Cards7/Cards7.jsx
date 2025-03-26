import React, { useEffect, useState } from "react";
import styles from "./Cards7.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { backendUrl } from "../../../utils/utils";

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
  const updateDate = async (date) => {
    if (!date) {
      console.error("Invalid date selected:", date);
      return; // Exit if the date is invalid
    }
  
    const newDate = new Date(date);
    if (isNaN(newDate)) {
      console.error("Invalid date format:", date);
      return; // Exit if the date cannot be parsed
    }
  
    console.log(newDate.toISOString() + "  new Date");
  
    try {
      const response = await axios.patch(`${backendUrl}places/${eventId}/start-time`, {
        eventTime: newDate.toISOString(), // Correctly call toISOString()
      });
  
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error updating date:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update the event time.");
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
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

  // Define maximum values for each time unit for percentage calculations.
  // For example, days assume a maximum of 30 days, hours 24, minutes and seconds 60.
  const maxValues = {
    days: 30,
    hours: 24,
    minutes: 60,
    seconds: 60,
  };

  return (
    <>
      <div
        className={styles.card}
        style={{ backgroundImage: `url(${eventImage})` }}
      >
        <div className={styles.overlay}>
          <h2 className={styles.title}>{eventTitle}</h2>
          <p className={styles.location}>{eventLocation}</p>
          {!reschedule ? (
            <p className={styles.date}>
              {formatDate(eventDate)} at {formatTime(eventDate)}
            </p>
          ) : (
            <div>
              <p className={styles.date}>{formatDate(eventDate)}</p>
              <p className="mt-[-20px]">7:00 AM | 11:00 AM | 3:00 PM</p>
            </div>
          )}

          {!reschedule && (
            <div className={styles.countdown}>
              {Object.entries(timeLeft).map(([unit, value]) => {
                // Define colors for each unit
                const colorMapping = {
                  days: "#FF5733", // Red for days
                  hours: "#33FF57", // Green for hours
                  minutes: "#3357FF", // Blue for minutes
                  seconds: "#FFC300", // Yellow for seconds
                };

                // Calculate progress percentage for each unit
                const percentage = (value / maxValues[unit]) * 100;

                return (
                  <div key={unit} className={styles.timerBox}>
                    <div style={{ width: "70px", height: "70px" }}>
                      <CircularProgressbar
                        value={percentage}
                        text={`${value}`}
                        styles={buildStyles({
                          textColor: "#fff",
                          pathColor: colorMapping[unit], // Use color based on the unit
                          trailColor: "rgba(255, 255, 255, 0.2)",
                          textSize: "16px",
                        })}
                      />
                    </div>
                    <p>{unit.toUpperCase()}</p>
                  </div>
                );
              })}
            </div>
          )}

          {reschedule ? (
            <button
              className={styles.button}
              style={{ marginTop: "-10px" }}
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
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          style={{
            fontFamily: "BrownRegular",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Hey {name},</h2>
            <p className="mb-4 text-gray-700">
              You have chosen a new "{eventTitle}" event on{" "}
              {formatDate(eventDate)} at {formatTime(eventDate)}. Have a great
              day ahead and enjoy your new round of golf!
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
                onClick={() => {
                  updateDate(selectedDate);
                  navigate(`/recommendations/${eventId}`);
                }}
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
