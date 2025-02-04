import React from "react";
import styles from "./Card1.module.css";

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
            <img src={weatherLogo} className="h-16 w-8 object-cover" alt="emoji" />
            <h4>
              {temperature} <span>°C</span>
            </h4>
          </div>
          <div className={styles.temperture}>
            <div className={styles.temp}>
              {temperature} <span>°C</span>
            </div>
            <div className={styles.temp}>
              {temperature} <span>°C</span>
            </div>
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
            <span className={styles.readMore}>{readMore}</span>
          </p>
        </div>

        <div className={styles.logo_section}>
          {events.map((event, index) => (
            <div className={styles.logo_content} key={index}>
              <div className={styles.logo}>
                {event.icon}
              </div>
              <div className={styles.logo_description}>
                {event.description}
              </div>
            </div>
          ))}
        </div>

        {/* Footer-section */}
        <div className={styles.footer}>
          <div className={styles.footer_content}>
            <div className={styles.footer_logo}>
              <img src={footerLogo} className="h-4 w-full object-cover mt-[-2px]" alt="footer logo" />
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