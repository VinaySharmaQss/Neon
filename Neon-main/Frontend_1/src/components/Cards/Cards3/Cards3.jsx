import React, { useState } from 'react';
import styles from './Cards3.module.css';
import { FiHeart } from "react-icons/fi";
import RemoveBtn from '../../../UI/RemoveBtn';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { backendUrl } from '../../../utils/utils';
import { useNavigate } from 'react-router';
import { Link } from 'lucide-react';

const Cards3 = ({ id, mainImage, icon, title, date, description, time, cardNumber, cardIcon }) => {
  const userId =
    useSelector((state) => state.user.user.id) ??
    JSON.parse(localStorage.getItem("user"))?.id ??
    null;

  const navigate = useNavigate();

  const [isFavorited, setIsFavorited] = useState(false);

  const addToFavorite = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}places/addToFavourite`,
        {
          userId: userId,
          placeId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Added to favorites:", response.data);

      if (response.data.success) {
        setIsFavorited(true); // Change the heart color
        toast.success("Added to favorites");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("Error adding to favorites:", error.response?.data || error.message);
    }
  };

  // Remove from the favorites
  const removeFromFavorite = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}places/removeFromFavourite`,
        {
          userId: userId,
          placeId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Removed from favorites:", response.data);

      if (response.data.success) {
        window.location.reload();
        toast.success("Removed from favorites");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("Error removing from favorites:", error.response?.data || error.message);
    }
  };

  return (
    
    <div className={styles.container} >
      <div className={styles.card}>
        <img
          src={mainImage}
          alt="Event"
          className={styles.cardImage}
        />
        <div className={styles.icons}>
          {cardIcon ? (
            <RemoveBtn onClick={removeFromFavorite} />
          ) : (
            <FiHeart
              className={styles.heartIcon}
              fill={isFavorited ? 'red' : '#00000080'}
              onClick={addToFavorite}
            />
          )}
          <div className="relative flex items-center justify-center w-20 h-28 shadow-lg">
            <div className={styles.cardNumber}>{!cardIcon ? cardNumber : ""}</div>
          </div>
        </div>
      </div>

      <div className={styles.content} onClick={() => navigate(`/event-details/${id}`)}>
        <div className={styles.title}>
          <div className={styles.titleLeft}>
            <img src={icon} alt="icon" style={{ width: "9px", height: "9px", objectFit: "cover" }} />
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