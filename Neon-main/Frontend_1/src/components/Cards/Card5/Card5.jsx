import React from 'react';
import styles from './Card5.module.css';
import { FiHeart } from "react-icons/fi";
import { useNavigate } from 'react-router';

const Card5 = ({id, mainImage, title, date, description, time, logo }) => {
  const navigate= useNavigate();
  return (
    <div className={styles.container} onClick={()=>navigate(`/event-details/${id}`)}>
      <img src={mainImage} alt="Event" className={styles.mainImage} />
      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.date}>{date}</p>
          <p className={styles.time}>{time}</p>
        </div>
        <div className={styles.right}>
          <FiHeart className={styles.heartIcon} fill="#00000080" />
          <div className="flex flex-row gap-4">
            <img src={logo} alt="Logo" className={styles.logo} />
            <p style={{ fontFamily: "BrownRegular", marginTop: "8px" ,fontSize: "12px" }}>
              Overhelmed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card5;
