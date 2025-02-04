import React from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import GoodMorning from "../../components/MorningText/GoodMorning";
import Slider from "../../components/Slider/Slider";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import Card4 from "../../components/Cards/Cards4/Card4";
import { card1Data, card2Data, card3Data } from "../../constants/data";
import Slider2 from "../../components/Slider/Slider2";
import joy from "../../../assets/img/joy.svg";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
        <GoodMorning />
      </header>

      <main>
        <Slider cards={card1Data} />
        <div className="flex flex-col flex-wrap gap-4">
          <p className={`text-4xl ${styles.card2_text}`}>
            Charlie, hope we understand you better
          </p>
          <Slider2 cards={card2Data} />
        </div>
       {/* CARD-3 */}
        <div className="flex flex-col flex-wrap gap-4">
          <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
            <img src={joy} alt="joy" className="h-6 object-cover" />
            <p>Joyed</p>
          </div>
          <div className="flex flex-col flex-wrap gap-4">
            <p className={`text-4xl ${styles.card2_text}`}>
            Today's recommendations for you, Charlie!
            </p>
            <div className="flex flex-wrap gap-4  mx-16">
              {card3Data.map((card, index) => (
                <Cards3 key={index} {...card} />
              ))}
            </div>
          </div>
        </div>

        {/* CARD-4 */}
        <div className="flex flex-col flex-wrap gap-4">
          <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
            <img src={joy} alt="joy" className="h-6 object-cover" />
            <p>Joyed</p>
          </div>
          <div className="flex flex-col flex-wrap gap-4">
            <p className={`text-4xl ${styles.card2_text}`}>
            Today's recommendations for you, Charlie!
            </p>
            <div className="flex flex-wrap gap-4  mx-16">
              {card3Data.map((card, index) => (
                <Cards3 key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
