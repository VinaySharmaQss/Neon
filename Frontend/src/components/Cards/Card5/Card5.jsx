import React from 'react';
import styles from './Card5.module.css';
import { FaHeart } from 'react-icons/fa';

const Card5 = ({ mainImage, title, date, description, time, logo }) => {
  return (
    <div className={styles.container}>
      <img src={mainImage} alt="Event" />
      <div className={styles.content}>
        <div className={styles.left}>
          <h1 className='absolute top-2'>{title}</h1>
          <p>{date}</p>
          <p className='absolute bottom-0.5'>{time}</p>
        </div>
        <div className={`${styles.right}`}>
          <FaHeart className={styles.heartIcon} />
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Card5;