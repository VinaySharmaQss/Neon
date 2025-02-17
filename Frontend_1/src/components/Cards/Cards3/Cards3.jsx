import React from 'react';
import styles from './Cards3.module.css';
import { FiHeart } from "react-icons/fi";
import RemoveBtn from '../../../UI/RemoveBtn';

const Cards3 = ({ mainImage, icon, title, date, description, time, cardNumber, cardIcon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img 
          src={mainImage}
          alt="Event"
          className={styles.cardImage}
        />
        <div className={styles.icons}>
          {cardIcon ? <RemoveBtn /> : <FiHeart className={styles.heartIcon} fill='#00000080' />} 
          <div className="relative flex items-center justify-center w-20 h-28 shadow-lg">
            <div className={styles.cardNumber}>{cardNumber}</div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.titleLeft}>
            <img src={icon} alt="icon" style={{ width: "9px", height: "9px",objectFit:"cover" }} />
            <p>{title}</p>
          </div>
          <div className={styles.titleRight}>
            <p>{date}</p>
          </div>
        </div>

        <div className={styles.description}>
          <p>{description}</p>
        </div>

        <div className={styles.footer}>
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards3;