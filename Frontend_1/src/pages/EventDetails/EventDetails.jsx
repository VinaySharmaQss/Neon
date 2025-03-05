import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { ImageGrid } from "../../components/ImageGrid/ImageGrid";
import Footer from "../../components/Footer/Footer";
import styles from "./EventDetails.module.css";
import Card6 from "../../components/Cards/Cards6/Card";
import { BiCategory } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { card3_1Data, reviews } from "../../constants/data";
import Slider4 from "../../components/Slider/Slider4";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../../utils/utils";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { postEvent } from "../../redux/features/card";
import ReviewModal from "../../components/Modal/Modal";
import { modalToggle } from "../../redux/features/modal";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userId =
    useSelector((state) => state.user?.user?.id) ??
    JSON.parse(localStorage.getItem("user"))?.id ??
    null;
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);

  const stars = Array.from({ length: 5 });
  const colors = {
    orange: "#ff385c",
    grey: "#e4e5e9",
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, {
          withCredentials: true,
        });

        if (userId && id) {
          dispatch(postEvent({ placeId: parseInt(id, 10), userId }));
        }

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
      }
    };

    fetchPlaces();
  }, [dispatch, id, userId]);

  useEffect(() => {
    const getEvent = async () => {
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
        console.error("Error fetching event:", error);
        setError("Error fetching event");
        toast.error(error.response?.data?.message || "Error fetching event");
      }
    };
    getEvent();
  }, [id]);

  if (error)
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );

  const card3Data_User = places.slice(0, 15).map((place) => ({
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

  return (
    <>
      <Navbar />
     <ReviewModal isModalOpen={isModalOpen}
      placeId={id} />
      {/* Feedback Banner */}
      <div className="w-[1122.48px] h-[128.57px]  border border-[#222222] rounded-lg flex items-center justify-between px-6 mx-10 mt-8 mb-4"
       style={{ fontFamily: "BrownRegular" }}>
        <div>
          <h2 className="text-[27px] font-medium text-gray-800"
           style={{ fontFamily: "IvyMode" }}>Hey Charlie,</h2>
          <p className="text-[16px] text-gray-600">
            We are sure that you have enjoyed this event a lot. Would you like
            to share your feedback with us?
            <br />
            It helps us to improve and serve you better.
          </p>
        </div>
        <button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-900 transition"
         onClick={() => dispatch(modalToggle())}>
          Add a review
        </button>
      </div>

      {/* Event Details */}
      <div className="flex flex-col px-12">
        <h1 className={styles.heading}>{event?.title}</h1>
        <div className={styles.reviews}>
          <div className={styles.stars}>
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={10}
                color={event?.rating > index ? colors.orange : colors.grey}
              />
            ))}
          </div>
          <div className={styles.reviewNum}>
            {event?.rating} ({event?.reviews?.length} reviews)
          </div>
          <div className={styles.reviewCity}>{event?.location}</div>
        </div>
      </div>

      <div className={styles.Images}>
        <div className={styles.scheduled}>Scheduled</div>
        <ImageGrid Image={event?.mainImage} />
      </div>

      <div className={styles.description}>
        <div className={styles.content}>
          <h1>About the Event</h1>
          <EventInfo icon={<BiCategory />} title={event?.category} description={`This is one of the primary categories under the ${event?.category} category.`} />
          <EventInfo icon={<CiLocationOn />} title="Great location" description="Every guest has given a five-star rating to this location." />
          <EventInfo
            image={event?.footerLogo}
            title={event?.footerDescription}
            description="This event has a rating of 5.0 that makes this event overwhelmed."
          />
          <div className={styles.para}>
            <p className={styles.eventDescription}>{event?.description}</p>
            <p className={styles.eventDescription}>{event?.description}</p>
          </div>
        </div>

        <div className="flex flex-col items-center mr-[120px]">
          <div className={styles.box}>
            <Card6 />
          </div>
          <p className="font-['BrownRegular']">Need help?</p>
        </div>
      </div>

      <div className="flex flex-col relative mb-10 ml-32">
        <h1 className={styles.heading} style={{ fontFamily: "IvyMode" }}>
          Round of Golf
        </h1>
        <div className={styles.reviews}>★★★★★</div>
        <div className={styles.reviewNum}>4.5 (23 reviews)</div>
        <p className={styles.reviewText}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr...
        </p>
      </div>

      <div className={styles.reviewCard}>
        <Slider4 cards={reviews} />
      </div>

      <div className={`${styles.content} ml-[45px]`}>
        <h1>Recommendations</h1>
      </div>

      <div className="grid grid-cols-5 gap-4 mr-24 ml-12">
        {card3Data_User.slice(0, 10).map((card, index) => (
          <Cards3 key={index} {...card} cardIcon={false} />
        ))}
      </div>

      <Footer />
    </>
  );
};

const EventInfo = ({ icon, image, title, description }) => (
  <div className={styles.eventDetails}>
    <div className={styles.eventContent}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {image && <img src={image} alt="" className="h-6 object-cover" />}
      <div className={styles.eventTitle}>{title}</div>
    </div>
    <div className={styles.eventDescription}>{description}</div>
  </div>
);

export default EventDetails;
