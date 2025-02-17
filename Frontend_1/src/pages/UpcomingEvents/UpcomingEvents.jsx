import  { useState } from "react";
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
  const [visibleCards, setVisibleCards] = useState(5);

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 5);
  };

  
  return (
    <>
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Hey Charlie,</h1>
            <p>Let&apos;s find something exiting for you.</p>
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
              <p>How are you willing to travel?</p>
              <div className={styles.RightButtons}>
                <ButtonPair />
                <ButtonPair />
                <ButtonRounded width={32}>No limits</ButtonRounded>
              </div>
            </div>
          </div>

          <div className={styles.button_Content}>
            <p>You can always filter out the events by category wise.</p>
            <div className="flex gap-4 flex-wrap mt-[-5px]">
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
        {card3_1Data.slice(0, visibleCards).map((card, index) => (
          <Cards3 key={index} {...card} cardIcon={false} />
        ))}
      </div>
{visibleCards < card3_1Data.length && (
        <div className="flex flex-row justify-center items-center my-8" style={{fontFamily:"BrownRegular"}}>
          <button
            onClick={handleLoadMore}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
        <Footer />
      </div>
    </>
  );
};

export default UpcomingEvents;
