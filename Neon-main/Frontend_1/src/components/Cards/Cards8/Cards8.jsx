import React from 'react';
import styles from "./Cards8.module.css";
import { IoIosStar } from "react-icons/io";
import Overhelmed from "../../../../assets/img/overwhelmed.svg";
import Disappoint from "../../../../assets/img/disappointed.svg";
import Bore from "../../../../assets/img/boredom.svg";
import Anger from "../../../../assets/img/anger.svg";
import Joy from "../../../../assets/img/joy.svg";
import Appreciation from "../../../../assets/img/appreciation.svg";

const Cards8 = ({ feedback = true, mainImage, title, date, rating, reviewsCount, description }) => {
  const active =  Math.round(6-rating);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={mainImage} alt="Event" className={styles.img} />
        <div className={styles.leftContent}>
          <div className={styles.leftTitle}>
            {title}
          </div>
          <div className={styles.date}>
            {date}
          </div>
          <div className={styles.rating}>
            <div className={styles.ratingNum}>{reviewsCount} reviews</div>
            <div className={styles.stars}>
              <IoIosStar fill='#FFEE00' />
              <span className='mt-1'>{rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightDate}>
          {date}
        </div>
        <div className={styles.rightTitle}>
          Great experience!
        </div>
        <p className={styles.description}>
          {description}
        </p>
        <div>
          {feedback ?
            <div className={styles.icons}>
              <img src={Overhelmed} alt="Overwhelmed" className={`${styles.icon_image} ${active === 1 ? styles.active : ''}`} />
              <img src={Joy} alt="Joy" className={`${styles.icon_image} ${active === 2 ? styles.active : ''}`} />
              <img src={Bore} alt="Boredom" className={`${styles.icon_image} ${active === 3 ? styles.active : ''}`} />
              <img src={Appreciation} alt="Appreciation" className={`${styles.icon_image} ${active === 4 ? styles.active : ''}`} />
              <img src={Disappoint} alt="Disappointed" className={`${styles.icon_image} ${active === 5 ? styles.active : ''}`} />
              <img src={Anger} alt="Anger" className={`${styles.icon_image} ${active === 6 ? styles.active : ''}`} />
            </div>
            :
            <button className='w-[112px] h-[33px] bg-black text-white rounded-sm text-[12px]'
              style={{ fontFamily: "BrownRegular" }}>
              Add a review
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Cards8;