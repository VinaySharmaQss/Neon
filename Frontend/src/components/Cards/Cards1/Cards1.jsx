import React from "react";
import styles from "./Card1.module.css";
import { TfiBag } from "react-icons/tfi";
import image from "../../../assets/img/holiday_0.png";
import weatherLogo from "../../../assets/img/weather_img.png"
const Cards1 = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.mainImage}>
            <img src={image} alt="" />
          </div>
          <div className={styles.leftContent}>
            <div className={styles.mainWeather}>
              <img src={weatherLogo} className="h-16 w-8 object-cover" alt="emoji" />
              <h4>
                18 <span>°C</span>
              </h4>
            </div>
            <div className={styles.temperture}>
              <div className={styles.temp}>
                18 <span>°C</span>
              </div>
              <div className={styles.temp}>
                18 <span>°C</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {/* Header-content */}
          <div className={styles.header}>
            <h1>Round of Golf</h1>
       
              <div className={styles.content}>
                <div className={styles.starRating}>
                ★★★★★
                </div>
                <div className={styles.ratingNum}>4.5</div>
                <div className={styles.reviews}>(23 reviews)</div>
              </div>
            </div>
        

          {/* Body-content */}

          <div className={styles.body}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quae. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quae....
              <span className={styles.readMore}>read-more</span>
            </p>
          </div>

          <div className={styles.logo_section}>
            <div className={styles.logo_content}>
              <div className={styles.logo}>
                <TfiBag />
              </div>
              <div className={styles.logo_description}>
                Nov 10,10:30 AM - Nov 10,10:30 AM
              </div>
            </div>

            <div className={styles.logo_content}>
              <div className={styles.logo}>
                <TfiBag />
              </div>
              <div className={styles.logo_description}>
                Nov 10,10:30 AM - Nov 10,10:30 AM
              </div>
            </div>

            <div className={styles.logo_content}>
              <div className={styles.logo}>
                <TfiBag />
              </div>
              <div className={styles.logo_description}>
                Nov 10,10:30 AM - Nov 10,10:30 AM
              </div>
            </div>
          </div>

          {/* Footer-section */}

          <div className={styles.footer}>
            <div className={styles.footer_content}>
              <div className={styles.footer_logo}>
              🥹
              </div>
              <div className={styles.footer_description}>
                Overhelmed vibes are coming here
              </div>
            </div>
            <div className={styles.footer_link}>
              <a href="">Scheduled</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards1;
