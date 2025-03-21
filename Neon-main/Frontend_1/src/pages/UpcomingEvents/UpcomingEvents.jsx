import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { card3_1Data, events as defaultEvents } from "../../constants/data";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import styles from "./UpcomingEvents.module.css";
import ButtonPair from "../../UI/ButtonPair";
import ButtonRounded from "../../UI/ButtonRounded";
import axios from "axios";
import { backendUrl } from "../../utils/utils";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdOutlineDateRange } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const userName =
    useSelector((state) => state.user?.user?.name) ||
    JSON.parse(localStorage.getItem("user"))?.name ||
    "Guest";
  const isLogin =
    useSelector((state) => state.user?.isLogin) ||
    JSON.parse(localStorage.getItem("isLogin")) ||
    false;

  const [places, setPlaces] = useState([]);
  const [visibleCards, setVisibleCards] = useState(5);
  const [activeEvent, setActiveEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [error, setError] = useState("");

  const handleLoadMore = () => {
    setVisibleCards((prev) => prev + 5);
  };

  useEffect(() => {
    const getAllCards = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setPlaces(response.data.message);
         
        } else {
          setError("Failed to load places");
          toast.error("Failed to load places");
        }
      } catch (err) {
        console.error("Error fetching places:", err);
        setError("Error fetching places");
        toast.error("Error fetching places");
      }
    };
    getAllCards();
  }, []);

  // Map place data into the structure for Cards3
  const cardsData = places.map((place) => ({
    id: place.id,
    mainImage: place.mainImage,
    icon: place.footerLogo,
    category: place.category,
    title: place.footerDescription.slice(0, 20),
    description: place.title,
    eventTime: place.eventTime,
    eventEndTime: place.eventEndTime,
    location: place.location, // Ensure location is included
  }));

  // 1) Filter by activeEvent (category) if set
  const categoryFiltered = activeEvent
    ? cardsData.filter((card) => card.category === activeEvent)
    : cardsData;

  // 2) Further filter by selectedDate if set
  const dateFilteredCards = selectedDate
    ? categoryFiltered.filter((card) => {
        const selected = new Date(selectedDate);
        const start = new Date(card.eventTime);
        const end = new Date(card.eventEndTime);
        return selected >= start && selected <= end;
      })
    : categoryFiltered;

  // 3) Further filter by selectedLocation if set
  const locationFilteredCards = selectedLocation
    ? dateFilteredCards.filter((card) => card.location === selectedLocation)
    : dateFilteredCards;

  const finalCards = isLogin
    ? locationFilteredCards.slice(0, visibleCards)
    : card3_1Data.slice(0, visibleCards);

  const noFilteredCards = isLogin && locationFilteredCards.length === 0 && (activeEvent || selectedLocation);

  // Get unique locations from the places data
  const uniqueLocations = Array.from(new Set(places.map((p) => p.location))).filter(Boolean);

  const handleStaticData = ()=>{
    if(!isLogin){
      navigate("/auth/login")
    }
  }

  return (
    <>
      <Navbar />
      <div onClick={handleStaticData}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Hey {userName},</h1>
          <p>Let's find something exciting for you.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <p>What suits your schedule?</p>
            <div className={styles.LeftButtons}>
              {/* Date input disguised as a styled button */}
              <div className="relative w-[120px] h-[35px]">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer appearance-none"
                />
                <div className="flex items-center justify-end w-full h-full border border-black rounded-full px-2">
                  <MdOutlineDateRange className="text-pink-500" />
                  <span className="ml-1 text-gray-700 text-[10px]" style={{ fontFamily: "BrownRegular" }}>
                    {selectedDate || "Pick a date"}
                  </span>
                </div>
              </div>
              {/* Location dropdown integrated from our merged component */}
              <div className="relative w-[225px] h-[35px] max-w-xs mx-auto">
                {/* Hidden select element covering the entire container */}
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer appearance-none"
                >
                  <option value="">Pick a location</option>
                  {uniqueLocations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {/* Visible container */}
                <div className="flex items-center border-[1px] border-black rounded-full px-2 py-1 w-full h-full">
                  <FaMapMarkerAlt className="text-pink-500 ml-1" />
                  <span
                    className="ml-1 text-gray-700 text-[10px]"
                    style={{ fontFamily: "BrownRegular" }}
                  >
                    {selectedLocation || "Pick a location"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contentRight}>
            <p>How are you willing to travel?</p>
            <div className={styles.RightButtons}>
              <ButtonPair />
              <ButtonPair />
              <ButtonRounded width={32}>No limits</ButtonRounded>
            </div>
          </div>
        </div>

        <div className={styles.button_Content}>
          <p>You can always filter out the events by category.</p>
          <div className="flex gap-4 flex-wrap mt-[-5px]">
            {defaultEvents.map(({ name }, index) => (
              <ButtonRounded
                key={index}
                width={`${name.length * 10}px`}
                active={activeEvent === name}
                onClick={() => setActiveEvent(name === activeEvent ? "" : name)}
              >
                {name}
              </ButtonRounded>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-center text-red-500 mt-4">{error}</div>
        )}

        {noFilteredCards ? (
          <div className="text-center text-gray-500 mt-8">
            No events of this category available on the selected date.
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4 mr-24 ml-12">
            {(isLogin ? locationFilteredCards : card3_1Data)
              .slice(0, visibleCards)
              .map((card, index) => (
                <Cards3 key={card.id || index} {...card} cardIcon={false} />
              ))}
          </div>
        )}

        {visibleCards < (isLogin ? locationFilteredCards.length : card3_1Data.length) && (
          <div className="flex flex-row justify-center items-center my-8" style={{ fontFamily: "BrownRegular" }}>
            <button
              onClick={handleLoadMore}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <Footer />
      </div>
    </>
  );
};

export default UpcomingEvents;