import React from "react";
import styles from "./Card1.module.css";
import { Link } from "react-router-dom";
import { PiBagSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import weather from "../../../../assets/img/weather.svg";

const Cards1 = ({
  mainImage,
  weatherLogo,
  temperature,
  title,
  rating,
  ratingNum,
  reviews,
  description,
  readMore,
  events,
  eventEndTime,
  footerLogo,
  footerDescription,
  footerLink
}) => {
  // Create an array of 5 stars and define colors for filled and empty stars.
  const stars = Array.from({ length: 5 });
  const colors = {
    orange: " #ff385c",
    grey: "#e4e5e9",
  };

  return (
    <div className={styles.card} >
      <div className={styles.left}>
        <div className={styles.mainImage}>
          <img src={mainImage} alt={title} />
        </div>
        <div className={styles.leftContent}>
          <div className={styles.mainWeather}>
            <img src={weather} className="object-cover" alt="Weather" />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {/* Header Content */}
        <div className={styles.header}>
          <h1>{title}</h1>
          <div className={styles.content}>
            <div className={styles.starRating}>
              {stars.map((_, index) => (
                <FaStar
                  key={index}
                  size={10}
                  color={rating > index ? colors.orange : colors.grey}
                />
              ))}
            </div>
            <div className={styles.ratingNum}>{ratingNum}</div>
            <div className={styles.reviews}>{reviews}</div>
          </div>
        </div>

        {/* Body Content */}
        <div className={styles.body}>
          <p>
            {description.slice(0, 150)}...
            <Link to="/event-details">
              <span className={styles.readMore}>{readMore}</span>
            </Link>
          </p>
        </div>

        {/* Logo Section */}
        <div className={styles.logo_section}>
          <div className={styles.logo_content}>
            <div className={styles.logo}>
              <PiBagSimpleLight style={{ fontSize: "0.8rem", color: "red" }} />
            </div>
            <div className={styles.logo_description}>
              {events[0]?.description} - {eventEndTime}
            </div>
          </div>
          <div className={styles.logo_content}>
            <div className={styles.logo}>
              <CiLocationOn style={{ fontSize: "0.8rem", color: "red" }} />
            </div>
            <div className={styles.logo_description}>
              {events[1]?.description}
            </div>
          </div>
          <div className={styles.logo_content}>
            <div className={styles.logo}>
              <BiCategory style={{ fontSize: "0.8rem", color: "red" }} />
            </div>
            <div className={styles.logo_description}>
              {events[2]?.description}
            </div>
          </div>
        </div>
        
        {/* Footer Section */}
        <div className={styles.footer}>
          <div className={styles.footer_content}>
            <div className={styles.footer_logo}>
              <img src={footerLogo} className="h-3 w-full object-cover" alt="Footer Logo" />
            </div>
            <div className={styles.footer_description}>
              {footerDescription}
            </div>
          </div>
          <div className={styles.footer_link}>
            <a href={footerLink || "#"}>{footerLink || "Schedule"}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards1;
