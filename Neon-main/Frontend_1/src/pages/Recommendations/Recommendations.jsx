import React, { useEffect, useState } from "react";
import Cards7 from "../../components/Cards/Cards7/Cards7";
import styles from "./Recommendations.module.css";
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

const Recommendations = () => {
  const { id } = useParams();
  const userName =
    useSelector((state) => state.user?.user?.name) ??
    JSON.parse(localStorage.getItem("user"))?.name ??
    "Guest";
  const userId = useSelector((state) => state.user?.user?.id) ?? JSON.parse(localStorage.getItem("user"))?.id ?? null;  
  const [completed, setCompleted] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [event, setEvent] = useState(null);
  const [places, setPlaces] = useState([]);
  const [eventData, setEventData] = useState([]);

  // ✅ Get the canceled event
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/event-details/${id}`, {
          withCredentials: true,
        });
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
        const response = await axios.get(`${backendUrl}user/completed/${userId}`, {
          withCredentials: true,
        });
        if (response.data) {
          const completedIds = response.data.completedPlaces.map(place => place.id);
          setCompleted(completedIds);
          toast.success("Completed places fetched successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching completed places");
      }
    };
    fetchCompleted();
  }, [userId]);

  // ✅ Get all the places, excluding the canceled event's place and completed places
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log();
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

  // Update eventData whenever places change
  useEffect(() => {
    if (places.length > 0) {
      const eventData = places.map((place) => ({
        eventId: place.id,
        eventTitle: place.title,
        eventLocation: place.location,
        eventDate: new Date(place.eventTime).toLocaleDateString(),
        eventImage: place.mainImage,
      }));
      setEventData(eventData);
    }
  }, [places]);

  const deletedEvent = event?.title;

  const card3Data_User = places.slice(0,15).map((place,index)=>({
    id: place.id,
    mainImage: place.mainImage,
    icon: place.footerLogo,
    category: place.category,
    title: place.footerDescription.slice(0, 20),
    description: place.title,
    time: `${new Date(place.eventTime).toLocaleTimeString()} - ${new Date(place.eventEndTime).toLocaleTimeString()}`,
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

  return (
    <>
      <Navbar />
      <div className={styles.title}>
        <h1 style={{ fontFamily: "IvyMode" }}>Hey {userName},</h1>
        <p>
          We have a few similar events for you against your today's canceled
          event "{deletedEvent}" because of unfavorable conditions. And one of
          them is just starting in an hour and 5 minutes drive away.
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
          <ButtonPair />
          <ButtonPair />
          <ButtonRounded width={32}>No limits</ButtonRounded>
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