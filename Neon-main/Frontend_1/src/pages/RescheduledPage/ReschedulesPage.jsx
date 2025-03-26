import React, { useEffect, useState } from "react";
import Cards7 from "../../components/Cards/Cards7/Cards7";
import styles from "./Reschedules.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ButtonPair from "../../UI/ButtonPair";
import ButtonRounded from "../../UI/ButtonRounded";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { backendUrl } from "../../utils/utils";
import toast from "react-hot-toast";
import axios from "axios";

const ReschedulesPage = () => {
  const { id } = useParams();
  const userName =
    useSelector((state) => state.user?.user?.name) ??
    JSON.parse(localStorage.getItem("user"))?.name ??
    "Guest";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [event, setEvent] = useState(null);
  const [places, setPlaces] = useState([]);
  const [eventData, setEventData] = useState([]);

  // Filtering states for driving and walking (for grid only)
  const [selectedDriving, setSelectedDriving] = useState(null);
  const [selectedWalking, setSelectedWalking] = useState(null);

  // Driving options and corresponding travel times (in minutes)
  const options2 = ["10 mins drive", "20 mins drive", "30 mins drive"];
  const travelTimes2 = [10, 20, 30];

  // Walking options and corresponding travel times (in minutes)
  const options = ["10 mins walking", "20 mins walking", "30 mins walking"];
  const travelTimes = [10, 20, 30];

  // Maximum travel time from backend (for disabling options)
  const [maxTravelTime, setMaxTravelTime] = useState(0);

  // ✅ Fetch the canceled event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}places/event-details/${id}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setEvent(response.data.message);
          toast.success("Event fetched successfully");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching rescheduled event");
      }
    };
    fetchEvent();
  }, [id]);

  // ✅ Fetch all places excluding the canceled event's place
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          const filteredPlaces = response.data.message.filter(
            (place) => String(place.id) !== String(id)
          );
          setPlaces(filteredPlaces);
          toast.success(response.data.data || "Places fetched successfully");
          const maxTime = Math.max(
            ...filteredPlaces.map((p) => p.travelTime || 0)
          );
          setMaxTravelTime(maxTime);
        }
      } catch (err) {
        console.error("Error fetching places:", err);
        toast.error("Error fetching places");
      }
    };
    fetchPlaces();
  }, [id]);

  // ✅ Combine the canceled event with the places list for the slider (no filters applied)
  useEffect(() => {
    if (event && places.length > 0) {
      const combinedPlaces = [event, ...places];
      const newEventData = combinedPlaces.map((place) => ({
        eventId: place.id,
        eventTitle: place.title,
        eventLocation: place.location,
        eventDate: new Date(place.eventTime).toLocaleDateString(),
        eventImage: place.mainImage,
      }));
      setEventData(newEventData);
    }
  }, [event, places]);

  // For the grid of Cards3, filter only the places list using the selected filters.
  const filteredPlacesForGrid = places.filter((place) => {
    let drivingPass = true;
    let walkingPass = true;
    if (selectedDriving !== null) {
      drivingPass = (place.travelTime || 0) <= travelTimes2[selectedDriving];
    }
    if (selectedWalking !== null) {
      walkingPass = (place.travelTime || 0) <= travelTimes[selectedWalking];
    }
    return drivingPass && walkingPass;
  });

  const card3Data_User = filteredPlacesForGrid.slice(0, 15).map((place) => ({
    id: place.id,
    mainImage: place.mainImage,
    icon: place.footerLogo,
    category: place.category,
    title: place.footerDescription?.slice(0, 20) || "",
    description: place.title,
    time: `${new Date(place.eventTime).toLocaleTimeString()} - ${new Date(
      place.eventEndTime
    ).toLocaleTimeString()}`,
    location: place.location,
  }));

  // Navigation functions for the slider (if needed)
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventData.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? eventData.length - 1 : prevIndex - 1
    );
  };

  // Reset both filters
  const resetTravelFilters = () => {
    setSelectedDriving(null);
    setSelectedWalking(null);
  };

  return (
    <>
      <Navbar />
      <div className={styles.title}>
        <h1 style={{ fontFamily: "IvyMode" }}>Hey {userName},</h1>
        <p>
          We have a few similar events for you against your today's rescheduled
          event "{event?.title}" because of unfavorable conditions. And one of
          them is just starting in an hour and 5 minutes drive away.
        </p>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.cardWrapper}>
          {eventData.length > 0 && (
            <Cards7
              name={userName}
              eventId={eventData[currentIndex].eventId}
              eventTitle={eventData[currentIndex].eventTitle}
              eventLocation={eventData[currentIndex].eventLocation}
              eventDate={eventData[currentIndex].eventDate}
              eventImage={eventData[currentIndex].eventImage}
              reschedule={true}
            />
          )}
        </div>
      </div>
      <div className={styles.title_1}>
        <h1>Some similar recommendations for you, {userName}.</h1>
        <div className={styles.RightButtons}>
          <div className="flex flex-row items-center gap-2">
            {/* Driving options */}
            <div className="flex justify-between items-center rounded-full border-[1px] border-black w-[320px] h-[35px] max-w-xs mx-auto mb-2">
              {options2.map((label, index) => {
                const isDisabled = travelTimes2[index] > maxTravelTime;
                // If no driving filter is selected, apply extra border (2px solid black) to the second option (index 1)
                const extraBorder =
                  selectedDriving === null && index === 1
                    ? {
                        borderLeft: "1px solid #222222",
                        borderRight: "1px solid #222222",
                      }
                    : {};
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isDisabled) {
                        if (selectedDriving === index) {
                          setSelectedDriving(null);
                        } else {
                          setSelectedDriving(index);
                          setSelectedWalking(null); // reset walking filter
                        }
                      }
                    }}
                    className={`px-2 py-2 w-full text-center text-[10px] transition-all ${
                      isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : selectedDriving === index
                        ? "bg-black text-gray-200"
                        : "text-black"
                    }`}
                    disabled={isDisabled}
                    style={{
                      fontFamily: "BrownRegular",
                      borderTopLeftRadius: index === 0 ? "9999px" : undefined,
                      borderBottomLeftRadius:
                        index === 0 ? "9999px" : undefined,
                      borderTopRightRadius:
                        index === options2.length - 1 ? "9999px" : undefined,
                      borderBottomRightRadius:
                        index === options2.length - 1 ? "9999px" : undefined,
                      ...extraBorder,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Walking options */}
            <div className="flex justify-between items-center rounded-full border-[1px] border-black w-[320px] h-[35px] max-w-xs mx-auto">
              {options.map((label, index) => {
                const isDisabled = travelTimes[index] > maxTravelTime;
                const extraBorder =
                  selectedWalking === null && index === 1
                    ? {
                        borderLeft: "1px solid #222222",
                        borderRight: "1px solid #222222",
                      }
                    : {};
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isDisabled) {
                        if (selectedWalking === index) {
                          setSelectedWalking(null);
                        } else {
                          setSelectedWalking(index);
                          setSelectedDriving(null); // reset driving filter
                        }
                      }
                    }}
                    className={`px-2 py-2 w-full text-center text-[10px] transition-all ${
                      isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : selectedWalking === index
                        ? "bg-black text-gray-200"
                        : "text-black"
                    }`}
                    disabled={isDisabled}
                    style={{
                      fontFamily: "BrownRegular",
                      borderTopLeftRadius: index === 0 ? "9999px" : undefined,
                      borderBottomLeftRadius:
                        index === 0 ? "9999px" : undefined,
                      borderTopRightRadius:
                        index === options.length - 1 ? "9999px" : undefined,
                      borderBottomRightRadius:
                        index === options.length - 1 ? "9999px" : undefined,
                      ...extraBorder,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <ButtonRounded width={32} onClick={resetTravelFilters}>
              No limits
            </ButtonRounded>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 mr-24 ml-12">
        {card3Data_User.map((place, index) => (
          <Cards3 key={place.id || index} {...place} cardIcon={false} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ReschedulesPage;
