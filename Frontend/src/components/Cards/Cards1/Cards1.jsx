import React from "react";
import styles from "./Card1.module.css";
import { Link } from "react-router-dom";
import { PiBagSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
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
  footerLogo,
  footerDescription,
  footerLink
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.mainImage}>
          <img src={mainImage} alt="" />
        </div>
        <div className={styles.leftContent}>
          <div className={styles.mainWeather}>
            <img src={weatherLogo} className=" object-cover" alt="emoji" />
            {/* <h4>
              {temperature} <span>°C</span>
            </h4>
          </div>
          <div className={styles.temperture}>
            <div className={styles.temp}>
              {temperature} <span>°C</span>
            </div>
            <div className={styles.temp}>
              {temperature} <span>°C</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {/* Header-content */}
        <div className={styles.header}>
          <h1>{title}</h1>
          <div className={styles.content}>
            <div className={styles.starRating}>{rating}</div>
            <div className={styles.ratingNum}>{ratingNum}</div>
            <div className={styles.reviews}>{reviews}</div>
          </div>
        </div>

        {/* Body-content */}
        <div className={styles.body}>
          <p>
            {description}
            <Link to="/event-details">
            <span className={styles.readMore}>{readMore}</span>
            </Link>
            
          </p>
        </div>

        <div className={styles.logo_section}>
      <div className={styles.logo_content}>
        <div className={styles.logo}>
           <PiBagSimpleLight style={{ fontSize: "0.8rem", color: "red" }} />

        </div>
        <div className={styles.logo_description}>
          {events[0]?.description}
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
          <BiCategory  style={{ fontSize: "0.8rem", color: "red" }}/>
        </div>
        <div className={styles.logo_description}>
          {events[2]?.description}
        </div>
      </div>
    </div>
        
         {/* Footer-section */}
        <div className={styles.footer}>
          <div className={styles.footer_content}>
            <div className={styles.footer_logo}>
              <img src={footerLogo} className="h-3 w-full object-cover " alt="footer logo" />
            </div>
            <div className={styles.footer_description}>{footerDescription}</div>
          </div>
          <div className={styles.footer_link}>
            <a href="">{footerLink}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards1;