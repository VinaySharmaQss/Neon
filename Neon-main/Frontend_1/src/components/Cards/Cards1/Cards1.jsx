import React from "react";
import styles from "./Card1.module.css";
import { Link } from "react-router-dom";
import { PiBagSimpleLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import weather from "../../../../assets/img/weather.svg";

const Cards1 = ({
  id,
  mainImage,
  weatherLogo,
  temperature,
  title,
  rating,
  ratingNum,
  reviews,
  description,
  readMore,
  events,
  eventEndTime,
  footerLogo,
  footerDescription,
  footerLink,
}) => {
  // Create an array of 5 stars and define colors for filled and empty stars.
  const stars = Array.from({ length: 5 });
  const colors = {
    orange: " #ff385c",
    grey: "#e4e5e9",
  };

  return (
    <Link to={`/event-details/${id}`}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.mainImage}>
            <img src={mainImage} alt={title} />
          </div>
          <div className={styles.leftContent}>
            <div className={styles.mainWeather}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII="
                className="object-cover"
                alt="Weather"
              />
              <p>
                {temperature} <span>°C</span>
              </p>
            </div>
            <div className={styles.temperture}>
              <div className={styles.temp}>
                {parseInt(temperature) + 6} <span>°C</span>
              </div>
              <div className={styles.temp}>
                {temperature-4} <span>°C</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {/* Header Content */}
          <div className={styles.header}>
            <h1>{title}</h1>
            <div className={styles.content}>
              <div className={styles.starRating}>
                {stars.map((_, index) => (
                  <FaStar
                    key={index}
                    size={10}
                    color={rating > index ? colors.orange : colors.grey}
                  />
                ))}
              </div>
              <div className={styles.ratingNum}>{ratingNum}</div>
              <div className={styles.reviews}>{reviews}</div>
            </div>
          </div>

          {/* Body Content */}
          <div className={styles.body}>
            <p>
              {description.slice(0, 150)}...
              <Link to={`/event-details/${id}`}>
                <span className={styles.readMore}>{readMore}</span>
              </Link>
            </p>
          </div>

          {/* Logo Section */}
          <div className={styles.logo_section}>
            <div className={styles.logo_content}>
              <div className={styles.logo}>
                <PiBagSimpleLight
                  style={{ fontSize: "0.8rem", color: "red" }}
                />
              </div>
              <div className={styles.logo_description}>
                {events[0]?.description} - {eventEndTime}
              </div>
            </div>
            <div className={styles.logo_content}>
              <div className={styles.logo}>
                <CiLocationOn style={{ fontSize: "0.8rem", color: "red" }} />
              </div>
              <div className={styles.logo_description}>
                {events[1]?.description}
              </div>
            </div>
            <div className={styles.logo_content}>
              <div className={styles.logo}>
                <BiCategory style={{ fontSize: "0.8rem", color: "red" }} />
              </div>
              <div className={styles.logo_description}>
                {events[2]?.description}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className={styles.footer}>
            <div className={styles.footer_content}>
              <div className={styles.footer_logo}>
                <img
                  src={footerLogo}
                  className="h-3 w-full object-cover"
                  alt="Footer Logo"
                />
              </div>
              <div className={styles.footer_description}>
                {footerDescription}
              </div>
            </div>
            <div className={styles.footer_link}>
              <a href={footerLink || "#"}>{footerLink || "Schedule"}</a>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cards1;
