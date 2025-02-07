import React from 'react';
import styles from './Card5.module.css';
import { FaHeart } from 'react-icons/fa';

const Card5 = ({ mainImage, title, date, description, time, logo }) => {
  return (
    <div className={styles.container}>
      <img src={mainImage} alt="Event" className={styles.mainImage} />
      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.date}>{date}</p>
          <p className={styles.time}>{time}</p>
        </div>
        <div className={styles.right}>
          <FaHeart className={styles.heartIcon} />
          <div className='flex flex-row gap-4'>
          <img src={logo} alt="Logo" className={styles.logo} />
          <p style={{fontFamily:"BrownRegular" ,
          marginTop:"8px",
          }}>Overhelmed</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Card5;
