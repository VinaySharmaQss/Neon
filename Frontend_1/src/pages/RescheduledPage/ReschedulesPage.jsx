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

  // ✅ Fetch the canceled event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/event-details/${id}`, {
          withCredentials: true,
        });
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
        }
      } catch (err) {
        console.error("Error fetching places:", err);
        toast.error("Error fetching places");
      }
    };
    fetchPlaces();
  }, [id]);

  // ✅ Combine the canceled event with the places list
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

  const deletedEvent = event?.title;

  const card3Data_User = places.slice(0, 15).map((place, index) => ({
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
          We have a few similar events for you against your today's resechuled
          event "{deletedEvent}" because of unfavorable conditions. And one of
          them is just starting in an hour and 5 minutes drive away.
        </p>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.cardWrapper}>
          {eventData.length > 0 && (
            <Cards7
              name= {userName}
              eventId={eventData[currentIndex].eventId}
              eventTitle={eventData[currentIndex].eventTitle}
              eventLocation={eventData[currentIndex].eventLocation}
              eventDate={eventData[currentIndex].eventDate}
              eventImage={eventData[currentIndex].eventImage}
              reschedule={true}
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
        {card3Data_User.map((place, index) => (
          <Cards3 key={index} {...place} cardIcon={false} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ReschedulesPage;
