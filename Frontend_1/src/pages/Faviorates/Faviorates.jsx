import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import Card5 from "../../components/Cards/Card5/Card5";
import Slider3 from "../../components/Slider/Slider3";
import Loader from "../../UI/Loader";

import { card2_1Data, card3Data, card5Data } from "../../constants/data";
import { backendUrl } from "../../utils/utils";
import styles from "./Faviorates.module.css";

const Faviorates = () => {

 
  const userName =
    useSelector((state) => state.user?.user?.name) ??
    JSON.parse(localStorage.getItem("user"))?.name ??
    "Guest";

  const isLogin =
    useSelector((state) => state.user?.isLogin) ??
    JSON.parse(localStorage.getItem("isLogin")) ??
    false;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setPlaces(response.data.message);
          toast.success("Places fetched successfully");
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
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );

  if (places.length === 0)
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        No places available.
      </div>
    );

  const card3Data_User = places.slice(0, 5).map((place, index) => ({
    id: place.id,
    mainImage: place.mainImage,
    icon: place.footerLogo,
    category: place.category,
    title: place.footerDescription?.slice(0, 20) || "",
    description: place.title,
    time: `${new Date(place.eventTime).toLocaleTimeString()} - ${new Date(place.eventEndTime).toLocaleTimeString()}`,
    location: place.location,
    cardNumber: index + 1,
  }));

  const card5DataUser = places.slice(0, 5).map((place) => ({
    id: place.id, // Use a comma here
    title: place.title,
    date: `From ${new Date(place.eventTime).toLocaleDateString()} to ${new Date(place.eventEndTime).toLocaleDateString()}`,
    time: `${new Date(place.eventTime).toLocaleTimeString()} - ${new Date(place.eventEndTime).toLocaleTimeString()}`,
    mainImage: place.mainImage,
    logo: place.footerLogo,
  }));
  

  return (
    <>
      <header>
        <Navbar />
        <div className="mx-[50px] my-8">
          <h1 className="text-[26px] mt-2.5" style={{ fontFamily: "IvyMode" }}>
            Good Morning {userName}!
          </h1>
          <p
            className="font-brown text-[17px]"
            style={{ fontFamily: "BrownRegular" }}
          >
            You have shortlisted 8 events to join later.
          </p>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-5 mr-24 ml-12">
          {card2_1Data.map((card, index) => (
            <Cards3 key={index} {...card} cardIcon={true} />
          ))}
        </div>

        <div className="flex flex-col flex-wrap gap-4">
          <p
            className={`text-[26px] ${styles.card2_text}`}
            style={{ fontFamily: "IvyMode" }}
          >
            Today&apos;s recommendations for you, {userName}!
          </p>
          <div className="flex flex-wrap gap-4">
            {isLogin ?
              <Slider3 cardsData={card5DataUser} CardComponent={Card5} />
            :<Slider3 cardsData={card5Data} CardComponent={Card5} />}
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-4">
          <p className={`text-[26px] ${styles.card2_text}`}>
            {userName}, we have found some recommendations for you.
          </p>
          <div className="flex flex-wrap gap-4 ml-16">
            {(isLogin ? card3Data_User : card3Data).map((card, index) => (
              <Cards3 key={index} {...card} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Faviorates;
