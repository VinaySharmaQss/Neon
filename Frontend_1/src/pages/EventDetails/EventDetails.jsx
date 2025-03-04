import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Icon from "../../../assets/img/joy.svg";
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

const EventDetails = () => {
  const { id } = useParams();
  const userId =
    useSelector((state) => state.user?.user?.id) ??
    JSON.parse(localStorage.getItem("user"))?.id ??
    null;

  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);

  const stars = Array.from({ length: 5 });
  const colors = {
    orange: " #ff385c",
    grey: "#e4e5e9",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, {
          withCredentials: true,
        });

        dispatch(postEvent({placeId:parseInt(id,10),userId:userId}));
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
  }, []);

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

  const card3Data_User = places.slice(0, 15).map((place, index) => ({
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
        <div className={styles.scheduled}>scheduled</div>
        <ImageGrid Image={event?.mainImage} />
      </div>

      <div className={styles.description}>
        <div className={styles.content}>
          <h1>About the Event</h1>
          <div className={styles.eventDetails}>
            <div className={styles.eventContent}>
              <div className={styles.icon}>
                <BiCategory />
              </div>
              <div className={styles.eventTitle}>{event?.category}</div>
            </div>
            <div className={styles.eventDescription}>
              This is one of the primary category comes under the{" "}
              {event?.category} category
            </div>
          </div>

          <div className={styles.eventDetails}>
            <div className={styles.eventContent}>
              <div className={styles.icon}>
                <CiLocationOn />
              </div>
              <div className={styles.eventTitle}>Great location</div>
            </div>
            <div className={styles.eventDescription}>
              Every guest has given a five star rating to this location.
            </div>
          </div>

          <div className={styles.eventDetails}>
            <div className={styles.eventContent}>
              <div className={styles.image}>
                <img
                  src={event?.footerLogo}
                  alt="Image"
                  className="h-6 object-cover"
                />
              </div>
              <div className={styles.eventTitle}>
                {event?.footerDescription}
              </div>
            </div>
            <div className={styles.eventDescription}>
              This event has a rating of 5.0 that make this event overwhelmed.
            </div>
          </div>

          <div className={styles.para}>
            <p className={styles.eventDescription}>{event?.description}</p>
            <p className={styles.eventDescription}>{event?.description}</p>
          </div>
        </div>

        <div
          className="flex flex-col items-center"
          style={{ marginRight: "120px" }}
        >
          <div className={styles.box}>
            <Card6 />
          </div>
          <p
            style={{
              font: "BrownRegular",
            }}
          >
            Need help ?
          </p>
        </div>
      </div>
      <div className="flex flex-col relative mb-10 ml-32">
        <h1 className={styles.heading} style={{ fontFamily: "IvyMode" }}>
          Round of Golf
        </h1>
        <div className={styles.reviews}>
          <div className={styles.stars}>★★★★★</div>
          <div
            className={styles.reviewNum}
            style={{ fontFamily: "BrownRegular" }}
          >
            4.5 (23 reviews)
          </div>
        </div>
        <p className={styles.reviewText} style={{ fontFamily: "BrownRegular" }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elit.
        </p>
      </div>
      <div className={styles.reviewCard}>
        <Slider4 cards={reviews} />
      </div>

      <div
        className={styles.content}
        style={{ fontFamily: "IvyMode", marginLeft: "45px" }}
      >
        <h1>Recommendations</h1>
      </div>
      <div className="grid grid-cols-5 mr-24 ml-12">
        {card3Data_User.map(
          (card, index) =>
            index < 10 && <Cards3 key={index} {...card} cardIcon={false} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventDetails;
