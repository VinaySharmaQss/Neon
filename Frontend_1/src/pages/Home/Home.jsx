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
import Loader from "../../UI/Loader";
import ReviewModal from "../../components/Modal/Modal";
import NotificationComponent from "../../components/Notification/Notifications";

const Home = () => {
  const userName = useSelector((state) => state.user?.user?.name) 
                ?? JSON.parse(localStorage.getItem("user"))?.name 
                ?? "Guest";
  const isLogin = useSelector((state) => state.user?.isLogin)
                ?? JSON.parse(localStorage.getItem("isLogin"))
                ?? false;

  const userId = useSelector((state) => state.user?.user?.id) 
                ?? JSON.parse(localStorage.getItem("user"))?.id
                ?? null;              
  

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewedPlaces, setViewedPlaces] = useState([]);


  // fetch the user's viewed places
   useEffect(() => {
    const fetchViewedPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/viewed/${userId}`, { withCredentials: true });
        if (response.data.success) {
          console.log(response.data?.data);
          setViewedPlaces(response?.data.data);
        } else {
          setError("Failed to load viewed places");
          toast.error("Failed to load viewed places");
        }
      } catch (err) {
        console.error("Error fetching viewed places:", err);
        toast.error("Error fetching viewed places");
      } 
    }
    fetchViewedPlaces();
  }, [userId]);

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
        <Loader/>
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

  const card1Data1 = viewedPlaces.map((place) => ({
    id: place.id,
    mainImage: place.mainImage,
    weatherLogo: weather,  
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
  const card3Data_User = places.slice(0,5).map((place,index)=>({
    id: place.id,
    mainImage: place.mainImage,
    icon: place.footerLogo,
    category: place.category,
    title: place.footerDescription.slice(0, 20),
    description: place.title,
    time: `${new Date(place.eventTime).toLocaleTimeString()} - ${new Date(place.eventEndTime).toLocaleTimeString()}`,
    location: place.location, 
    cardNumber: index+1
  }));
  const card2DataUser = places.slice(0,5).map((place,index)=>({
    id: place.id,
    mainImage: place.mainImage,
    logo: place.footerLogo,
    description: place.description.slice(0, 300),
    date:new Date(place.eventEndTime).toLocaleString(),
    visited:place.visited,
    button1: [
      {
        text: "Yes, I accept",
        class: "btn_black",
      },
      {
        text: "No, thanks",
        class: "btn_white",
      },
    ],
    button2: [
      {
        text: "Yes, I would share",
        class: "btn_black",
      },
      {
        text: "Remind me later",
        class: "btn_white",
      },
    ],
  }))
  return (
    <>
    <NotificationComponent/>
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
          <Slider cardsData={card2DataUser} CardComponent={Cards2} />
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
              {isLogin ? card3Data_User.map((card, index) => (
                <Cards3 key={index} {...card} />
              )) : card3Data.map((card, index) => (
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