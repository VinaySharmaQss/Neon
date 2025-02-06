import React from 'react';
import styles from './Card2.module.css';
import { Link } from 'react-router';

const Cards2 = ({ mainImage, logo, title, date, description, buttons }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.left_top}>
          <img src={mainImage} className={styles.img} alt="Mountain" />
          <img src={logo} className={styles.img_overlay} alt="Logo" />
        </div>
      </div>
      <div className={styles.right}>
        <h2>{title}</h2>
        <p className={styles.para1}>{date}</p>
        <p className={styles.para}>{description}</p>
        <div className={styles.btn_group}>
          {buttons.map((button, index) => (
          <Link to='/recommendations'>
            <button key={index} className={styles[button.class]}>
              {button.text}
            </button>
          </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards2;