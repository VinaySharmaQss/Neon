import React from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import GoodMorning from "../../components/MorningText/GoodMorning";
import Slider from "../../components/Slider/Slider";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import Card4 from "../../components/Cards/Cards4/Card4";
import {
  card1Data,
  card2Data,
  card3Data,
  card4Data,
} from "../../constants/data";
import joy from "../../../assets/img/joy.svg";
import Footer from "../../components/Footer/Footer";
import Cards1 from "../../components/Cards/Cards1/Cards1";
import Cards2 from "../../components/Cards/Cards2/Cards2";


const Home = () => {
  return (
    <>
      <header>
        <Navbar />
        <GoodMorning />
      </header>

      <main>
      <Slider cardsData={card1Data} CardComponent={Cards1} />
        <div className="flex flex-col flex-wrap gap-4">
          <p className='text-3xl mb-4 mt-16 ml-[50px]' style={{ fontFamily: "IvyMode" }}>
            Charlie, hope we understand you better
          </p>
          <Slider cardsData={card2Data}  CardComponent={Cards2}/>
        </div>
        {/* CARD-3 */}
        <div className="flex flex-col flex-wrap gap-4">
          <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
            <img src={joy} alt="joy" className="h-6 object-cover" style={{ fontFamily: "IvyMode" }} />
            <p>Joyed</p>
          </div>
          <div className="flex flex-col flex-wrap gap-4">
            <p className='text-3xl mb-4 mt-8 ml-[50px]' style={{ fontFamily: "IvyMode" }}>
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
          <div className="flex flex-col flex-wrap gap-4">
            <p className={`text-3xl ${styles.card2_text}`}>
              Charlie, here is your master journey with us so far!
            </p>
            <div className="flex flex-wrap gap-4  mx-16">
              {card4Data.map((card, index) => (
                <Card4 key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
        <p className={`text-3xl ${styles.card2_text}`}>Find events on map</p>
      </div>
      {/* map */}

      <Footer/>
    </>
  );
};

export default Home;
