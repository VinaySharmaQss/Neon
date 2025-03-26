import React, { useEffect, useState } from "react";
import Cards7 from "../../components/Cards/Cards7/Cards7";
import styles from "./Recommendations.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ButtonRounded from "../../UI/ButtonRounded";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { backendUrl } from "../../utils/utils";
import toast from "react-hot-toast";
import axios from "axios";

const Recommendations = () => {
  const { id } = useParams();
  const userName =
    useSelector((state) => state.user?.user?.name) ??
    JSON.parse(localStorage.getItem("user"))?.name ??
    "Guest";
  const userId =
    useSelector((state) => state.user?.user?.id) ??
    JSON.parse(localStorage.getItem("user"))?.id ??
    null;

  const [completed, setCompleted] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [event, setEvent] = useState(null);
  const [places, setPlaces] = useState([]);
  const [eventData, setEventData] = useState([]);

  // New states for travel filtering; only one filter can be active at a time.
  const [selectedWalking, setSelectedWalking] = useState(null);
  const [selectedDriving, setSelectedDriving] = useState(null);
  const [maxTravelTime, setMaxTravelTime] = useState(0);

  // Define travel options arrays for walking and driving
  const options = ["10 mins walking", "20 mins walking", "30 mins walking"];
  const travelTimes = [10, 20, 30];

  const options2 = ["10 mins drive", "20 mins drive", "30 mins drive"];
  const travelTimes2 = [40, 10, 40];

  // ✅ Get the canceled event
  useEffect(() => {
    const fetchPlace = async () => {
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
        console.log(error);
        toast.error("Error fetching canceled event");
      }
    };
    fetchPlace();
  }, [id]);

  // ✅ Get the user's completed places
  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}user/completed/${userId}`,
          { withCredentials: true }
        );
        if (response.data) {
          const completedIds = response.data.completedPlaces.map(
            (place) => place.id
          );
          setCompleted(completedIds);
          toast.success("Completed places fetched successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching completed places");
      }
    };
    if (userId) fetchCompleted();
  }, [userId]);

  // ✅ Get all the places, excluding the canceled event's place and completed places
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          const filteredPlaces = response.data.message.filter((place) => {
            return String(place.id) !== String(id) && !completed.includes(place.id);
          });
          setPlaces(filteredPlaces);
        }
      } catch (err) {
        console.error("Error fetching places:", err);
        toast.error("Error fetching places");
      }
    };
    fetchPlaces();
  }, [id, completed]);

  // Compute maximum travel time from fetched places
  useEffect(() => {
    if (places.length > 0) {
      const maxTime = Math.max(...places.map((p) => p.travelTime || 0));
      setMaxTravelTime(maxTime);
    }
  }, [places]);

  // Update eventData whenever places change. Apply travel filtering if any filter is active.
  useEffect(() => {
    if (places.length > 0) {
      const filteredPlaces = places.filter((place) => {
        let walkOk = true;
        let driveOk = true;
        if (selectedWalking !== null) {
          walkOk = place.travelTime <= travelTimes[selectedWalking];
        }
        if (selectedDriving !== null) {
          driveOk = place.travelTime <= travelTimes2[selectedDriving];
        }
        return walkOk && driveOk;
      });
      const eventData = filteredPlaces.map((place) => ({
        eventId: place.id,
        eventTitle: place.title,
        eventLocation: place.location,
        eventDate: new Date(place.eventTime).toLocaleDateString(),
        eventImage: place.mainImage,
      }));
      setEventData(eventData);
    }
  }, [places, selectedWalking, selectedDriving]);

  const deletedEvent = event?.title;

  // Map places into Cards3 data (for the grid of recommendations below)
  const card3Data_User = places
    .filter((place) => {
      // Apply same travel filters for the grid as well.
      let walkOk = true;
      let driveOk = true;
      if (selectedWalking !== null) {
        walkOk = place.travelTime <= travelTimes[selectedWalking];
      }
      if (selectedDriving !== null) {
        driveOk = place.travelTime <= travelTimes2[selectedDriving];
      }
      return walkOk && driveOk;
    })
    .slice(0, 15)
    .map((place) => ({
      id: place.id,
      mainImage: place.mainImage,
      icon: place.footerLogo,
      category: place.category,
      title: place.footerDescription.slice(0, 20),
      description: place.title,
      time: `${new Date(place.eventTime).toLocaleTimeString()} - ${new Date(
        place.eventEndTime
      ).toLocaleTimeString()}`,
      location: place.location,
    }));

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventData.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? eventData.length - 1 : prevIndex - 1
    );
  };

  const resetTravelFilters = () => {
    setSelectedWalking(null);
    setSelectedDriving(null);
  };

  return (
    <>
      <Navbar />
      <div className={styles.title}>
        <h1 style={{ fontFamily: "IvyMode" }}>Hey {userName},</h1>
        <p>
          We have a few similar events for you against your today's canceled event "
          {deletedEvent}" because of unfavorable conditions. And one of them is just
          starting in an hour and 5 minutes drive away.
        </p>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.cardWrapper}>
          {eventData.length > 0 && (
            <Cards7
              eventId={eventData[currentIndex].eventId}
              eventTitle={eventData[currentIndex].eventTitle}
              eventLocation={eventData[currentIndex].eventLocation}
              eventDate={eventData[currentIndex].eventDate}
              eventImage={eventData[currentIndex].eventImage}
            />
          )}
        </div>

        <button className={styles.prevButton} onClick={prevCard}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className={styles.nextButton} onClick={nextCard}>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className={styles.title_1}>
        <h1>Some similar recommendations for you, {userName}.</h1>
        <div className={styles.RightButtons}>
          <div className="flex flex-row items-center gap-2">
            {/* Driving options */}
            <div className="flex justify-between items-center rounded-full border-[1px] border-black w-[320px] h-[35px] max-w-xs mx-auto mb-2">
              {options2.map((label, index) => {
                const isDisabled = travelTimes2[index] > maxTravelTime;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isDisabled) {
                        // Toggle selection: if the same option is clicked, deselect it.
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
                        ? "bg-black text-gray-200 rounded-full"
                        : "text-black"
                    }`}
                    disabled={isDisabled}
                    style={{
                      fontFamily: "BrownRegular",
                      borderLeft: index === 1 ? "1px solid #707070" : undefined,
                      borderRight: index === 1 ? "1px solid #707070" : undefined,
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
                        ? "bg-black text-gray-200 rounded-full"
                        : "text-black"
                    }`}
                    disabled={isDisabled}
                    style={{
                      fontFamily: "BrownRegular",
                      borderLeft: index === 1 ? "1px solid #707070" : undefined,
                      borderRight: index === 1 ? "1px solid #707070" : undefined,
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
        {card3Data_User.slice(0, 15).map((place, index) => (
          <Cards3 key={index} {...place} cardIcon={false} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Recommendations;
