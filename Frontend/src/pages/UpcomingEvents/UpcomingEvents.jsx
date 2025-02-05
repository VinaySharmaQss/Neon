import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { card3_1Data, events } from "../../constants/data";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import styles from "./UpcomingEvents.module.css";
import ButtonPair from "../../UI/ButtonPair";
import ButtonRounded from "../../UI/ButtonRounded";
import LocationPicker from "../../UI/LocationPicker";
import DatePicker from "../../UI/DatePicker";

const UpcomingEvents = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  return (
    <>
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Hey Charlie,</h1>
            <p>Let's find something exiting for you.</p>
          </div>

          <div className={styles.content}>
            <div className={styles.contentLeft}>
              <p>What suits your schedules?</p>
              <div className={styles.LeftButtons}>
                <DatePicker />
                <LocationPicker />
              </div>
            </div>

            <div className={styles.contentRight}>
              <p>What suits your schedules?</p>
              <div className={styles.RightButtons}>
                <ButtonPair />
                <ButtonPair />
                <ButtonRounded width={32}>No limits</ButtonRounded>
              </div>
            </div>
          </div>

          <div className={styles.button_Content}>
            <p>You can always filter out the events by category wise.</p>
            <div className="flex gap-4 flex-wrap">
              {events.map(({ name }, index) => (
                <ButtonRounded
                  key={index}
                  width={`${name.length * 10}px`}
                  onClick={() => setActiveEvent(event)}
                  className={`px-4 py-2 rounded-full border flex items-center justify-center ${
                    activeEvent ? "bg-black text-white" : "border-gray-400"
                  }`}
                >
                  {name}
                </ButtonRounded>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 mr-24 ml-12">
          {card3_1Data.map((card, index) => (
            <Cards3 key={index} {...card} cardIcon={false} />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default UpcomingEvents;
