import React from "react";
import styles from "./Card4.module.css";
import Image from "../../../../assets/img/art.jpg";
const Card4 = () => {
  let flag = true;
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img src={Image} alt="Image" />
      </div>
      <div className={styles.card__content}>
        <h2 className={styles.card__title}>Round of Golf</h2>
        <p className={styles.card__text}>
        3 guests attended this event
        </p>
        <div className={styles.date}>on Nov 17, 2022</div>
        <div className={styles.card__footer}>
          {flag ? (
            <div className={styles.rating}>
              <div className={styles.rating__text}>You rated this event</div>
              <div className={styles.rating__star}> ★ ★ ★ ★ ★</div>
            </div>
          ) : (
            <div className={styles.non_rating}>Rate this event</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card4;
