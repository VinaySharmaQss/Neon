import React from 'react';
import styles from './Card2.module.css';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ReviewModal from '../../Modal/Modal';
import { modalToggle } from '../../../redux/features/modal';

const Cards2 = ({ id, mainImage, logo, title, date, description, button1, button2, visited, isReviewd }) => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const dispatch = useDispatch();

  return (
    <>
      <ReviewModal isModalOpen={isModalOpen} placeId={id} />
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.left_top}>
            <img src={mainImage} className={styles.img} alt="Mountain" />
            <img src={logo} className={styles.img_overlay} alt="Logo" />
          </div>
        </div>
        <div className={styles.right}>
          <h2 style={{ fontFamily: "BrownRegular" }}>{title}</h2>
          <p style={{ fontFamily: "BrownRegular" }} className={styles.para1}>{date}</p>
          <p style={{ fontFamily: "BrownRegular" }} className={styles.para}>{description}</p>
          <div className={styles.btn_group}>
            {isReviewd ? button1.map((button, index) => (
              <Link to={`/event-details/${id}`} key={index}>
                <button className={styles[button.class]} style={{ fontFamily: "BrownRegular" }}>
                  {button.text}
                </button>
              </Link>
            )) : button2.map((button, index) => (
              <button key={index} className={styles[button.class]} style={{ fontFamily: "BrownRegular" }} onClick={() => dispatch(modalToggle())}>
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards2;
