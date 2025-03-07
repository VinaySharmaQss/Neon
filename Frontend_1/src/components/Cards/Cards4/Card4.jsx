import React from "react";
import styles from "./Card4.module.css";
import { Link } from "react-router";

const Card4 = ({id, mainImage, title, guests, date, flag, rating }) => {
  return (
    <>
   
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src={mainImage} alt="Image" />
      </div>
      <div className={styles.card__content}>
        <h2 className={styles.card__title}>{title}</h2>
        <p className={styles.card__text}>
          {guests} guests attended this event
        </p>
        <div className={styles.date}>{date}</div>
        <div className={styles.card__footer}>
          {flag ? (
            <div className={styles.rating}>
              <div className={styles.rating__text}>You rated this event</div>
              <div className={styles.rating__star}>{rating}</div>
            </div>
          ) : (
             <Link to={`/event-details/${id}`}>
                <div className={styles.non_rating} 
            style={{
              cursor: "pointer"
            }}>Rate this event</div>
              </Link>
          )}
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Card4;