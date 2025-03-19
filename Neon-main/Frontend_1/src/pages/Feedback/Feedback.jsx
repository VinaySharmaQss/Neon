import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Feedback.module.css";
import logo from "../../../assets/img/overwhelmed.svg";
import Speedometer from "react-d3-speedometer";
import Cards8 from "../../components/Cards/Cards8/Cards8";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendUrl } from "../../utils/utils";

const Feedback = () => {
  const userName =
    useSelector((state) => state.user?.user?.name) ??
    JSON.parse(localStorage.getItem("user"))?.name ??
    "Guest";

  const id =
    useSelector((state) => state.user?.user?.id) ??
    JSON.parse(localStorage.getItem("user"))?.id ??
    null;

  const [feedback, setFeedback] = useState([]);

  // Function to determine vibe text based on rating
  const getVibeText = (value) => {
    if (value < 100) return "😁 Happy";
    if (value < 250) return "😐 Neutral";
    if (value < 400) return "😰 Overwhelmed";
    return "😡 Frustrated";
  };

  useEffect(() => {
    if (!id) return; // Prevents fetching if no user ID is found

    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}reviews/user/${id}/places`,
          { withCredentials: true }
        );

        // Extract unique places
        const uniquePlaces = [];
        const placeIds = new Set();

        response.data.data.forEach((item) => {
          if (!placeIds.has(item.place.id)) {
            placeIds.add(item.place.id);
            uniquePlaces.push(item.place);
          }
        });

        setFeedback(uniquePlaces);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [id]);

  // Map places into card data format
  const cardData = feedback.map((place) => ({
    id: place.id,
    mainImage: place.mainImage,
    logo: place.footerLogo,
    description: place.description.slice(0, 300),
    reviewsCount: `(${place.reviews?.length || Math.round(Math.random() * 10)})`,
    date: place.eventEndTime
      ? new Date(place.eventEndTime).toLocaleString()
      : "N/A",
    visited: place.visited,
    rating: place.rating,
    vibeValue:
      place.reviews?.reduce((acc, review) => acc + review.rating, 0) /
        place.reviews?.length || 0, // Calculate average rating
  }));

  // Calculate overall vibe value based on all places
  const overallVibeValue =
    cardData.reduce((acc, place) => acc + place.vibeValue, 0) /
      (cardData.length || 1); // Avoid division by zero

  return (
    <>
      <Navbar />
      <main>
        <div className={styles.container}>
          <div className={styles.right}>
            <img
              src={logo}
              alt="svg"
              className="h-[55px] object-cover w-[55px]"
            />
            <div className={styles.title}>Overwhelmed experience</div>
            <div className={styles.subTitle}>
              Your Vibe-O-Meter reading excites us too
            </div>
            <div className={styles.description}>
              We are happy too because we successfully kept you happy during
              this <br />
              visit to Sindalah City.
            </div>
          </div>
          <div className="flex justify-center items-center mr-40 mt-20">
            <Speedometer
              value={(overallVibeValue)*100}
              currentValueText={getVibeText((overallVibeValue)*100)}
              minValue={0}
              maxValue={500}
              segments={5}
              needleColor="black"
              startColor="green"
              endColor="red"
              ringWidth={50}
              width={350}
              height={200} // Adjusted for better fit
              textColor="black"
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.text}>
            Hi {userName},
            <br /> here are glimpses of your feedback shared with us.
          </div>

          {/* Render Cards */}
          {cardData.map((place, index) => (
            <Cards8 key={index} {...place} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Feedback;
