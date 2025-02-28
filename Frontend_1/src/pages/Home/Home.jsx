import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../../utils/utils";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import GoodMorning from "../../components/MorningText/GoodMorning";
import Slider from "../../components/Slider/Slider";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import Card4 from "../../components/Cards/Cards4/Card4";
import weather from "../../../assets/img/weather.svg";
import {
  card1Data,
  card2Data,
  card3Data,
  card4Data,
} from "../../constants/data";
import joy from "../../../assets/img/joy.svg";
import Footer from "../../components/Footer/Footer";
import Cards1 from "../../components/Cards/Cards1/Cards1";
import Cards2 from "../../components/Cards/Cards2/Cards2";
import MapComponent from "../../components/MapComponent/MapComponent";
import { useSelector } from "react-redux";

const Home = () => {
  const userName = useSelector((state) => state.user?.user?.name) 
                ?? JSON.parse(localStorage.getItem("user"))?.name 
                ?? "Guest";
  const isLogin = useSelector((state) => state.user?.isLogin)
                ?? JSON.parse(localStorage.getItem("isLogin"))
                ?? false;
                
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, { withCredentials: true });
        if (response.data.success) {
          setPlaces(response.data.message);
          toast.success(response.data.data || "Places fetched successfully");
        } else {
          setError("Failed to load places");
          toast.error("Failed to load places");
        }
      } catch (err) {
        console.error("Error fetching places:", err);
        setError("Error fetching places");
        toast.error("Error fetching places");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading)
    return (
      <div className="text-center text-lg font-medium mt-10">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        {error}
      </div>
    );
  if (places.length === 0)
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        No places available.
      </div>
    );

  const card1Data1 = places.map((place) => ({
    mainImage: place.mainImage,
    weatherLogo: weather,  // Provide a default weather logo
    temperature: place.temperature,
    title: place.title,
    rating: place.rating,
    ratingNum: place.rating.toFixed(1),
    reviews: `(${place.reviews?.length || 0})`,
    description: place.description,
    readMore: " read more",
    events: [
      { description: new Date(place.eventTime).toLocaleString() },
      { description: place.location },
      { description: place.eventType },
    ],
    eventEndTime: new Date(place.eventEndTime).toLocaleString(),
    footerLogo: place.footerLogo,
    footerDescription: place.footerDescription,
    footerLink: "Schedule",
  }));
  const cardData = places.map((place, index) => ({
    mainImage: place.mainImage,
    // Using a default icon URL (adjust as needed)
    icon: "https://via.placeholder.com/20",
    title: place.title,
    date: new Date(place.eventTime).toLocaleString(),
    description: place.description,
    // Use eventEndTime as the time (formatted as a locale time string)
    time: new Date(place.eventEndTime).toLocaleTimeString(),
    cardNumber: index + 1,
    // cardIcon is optional; leaving it as an empty string for now.
    cardIcon: "",
  }));
  return (
    <>
      <header>
        <Navbar />
        <GoodMorning />
      </header>

      <main>
        <Slider cardsData={isLogin ? card1Data1 : card1Data} CardComponent={Cards1} />
        <div className="flex flex-col flex-wrap gap-4">
          <p
            className="text-[26px] mb-4 mt-16 ml-[50px]"
            style={{ fontFamily: "IvyMode" }}
          >
            {userName}, hope we understand you better
          </p>
          <Slider cardsData={card2Data} CardComponent={Cards2} />
        </div>
        {/* CARD-3 */}
        <div className="flex flex-col flex-wrap gap-4">
          <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
            <img
              src={joy}
              alt="joy"
              className="h-6 object-cover"
              style={{ fontFamily: "IvyMode" }}
            />
            <p>Joyed</p>
          </div>
          <div className="flex flex-col flex-wrap gap-4">
            <p
              className="text-[26px] mb-4 mt-8 ml-[50px]"
              style={{ fontFamily: "IvyMode" }}
            >
              Today&apos;s recommendations for you, {userName}!
            </p>
            <div className="flex flex-wrap gap-4  ml-16">
              {card3Data.map((card, index) => (
                <Cards3 key={index} {...card} />
              ))}
            </div>
          </div>
        </div>

        {/* CARD-4 */}
        <div className="flex flex-col flex-wrap gap-4">
          <div className="flex flex-col flex-wrap gap-4">
            <p className={`text-[26px] ${styles.card2_text}`}>
              {userName}, here is your master journey with us so far!
            </p>
            <div className="flex flex-wrap gap-4  ml-16">
              {card4Data.map((card, index) => (
                <Card4 key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
        <p className={`text-[26px] ${styles.card2_text}`}>Find events on map</p>
      </div>
      <div  className="px-[5vw] w-[1250px] mb-[50px] h-[420px]">
        <MapComponent />
      </div>
      <Footer />
    </>
  );
};

export default Home;