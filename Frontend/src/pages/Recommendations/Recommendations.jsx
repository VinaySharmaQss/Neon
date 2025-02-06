import React, { useState } from "react";
import Cards7 from "../../components/Cards/Cards7/Cards7"; // Assuming Cards7 is correct
import { card3_1Data, eventData } from "../../constants/data"; // Ensure eventData is correctly imported
import styles from "./Recommendations.module.css"; // Import CSS module for styling
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ButtonPair from "../../UI/ButtonPair";
import ButtonRounded from "../../UI/ButtonRounded";
import Cards3 from "../../components/Cards/Cards3/Cards3";

const Recommendations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventData.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? eventData.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar />
      <div className={styles.title}>
        <h1>Hey Charlie,</h1>
        <p>
          We have a few similar event for you against your today's cancelled
          event "Round of Golf" because of unfavorable conditions. And one of
          them is just starting in an hour and 5 minutes drive away.
        </p>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.cardWrapper}>
          <Cards7
            eventTitle={eventData[currentIndex].eventTitle}
            eventLocation={eventData[currentIndex].eventLocation}
            eventDate={eventData[currentIndex].eventDate}
            eventImage={eventData[currentIndex].eventImage}
          />
        </div>

        {/* Navigation Buttons */}
        <button className={styles.prevButton} onClick={prevCard}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className={styles.nextButton} onClick={nextCard}>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
      <div className={styles.title}>
        <h1>Some similar recommendation for you, Charlie.</h1>
        <div className={styles.RightButtons}>
          <ButtonPair />
          <ButtonPair />
          <ButtonRounded width={32}>No limits</ButtonRounded>
        </div>
      </div>
      <div className="grid grid-cols-5 mr-24 ml-12">
          {card3_1Data.map((card, index) => (
            <Cards3 key={index} {...card} cardIcon={false} />
          ))}
        </div>
      <Footer />
    </>
  );
};

export default Recommendations;
