import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Slider3 from "../../components/Slider/Slider3";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import { card2_1Data, card3Data, card5Data } from "../../constants/data";
import styles from "./Faviorates.module.css";
const Faviorates = () => {
  return (
    <>
      <header>
        <Navbar />
        <div className="mx-[50px] my-8">
          <h1 className="text-3xl  mb-2" style={{ fontFamily: "IvyMode" }}>Good Morning Charlie!</h1>
          <p className="font-brown text-xl" style={{ fontFamily: "BrownRegular" }}>
            You have short listed 8 events to join later.
          </p>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-5 mr-24 ml-12">
          {card2_1Data.map((card, index) => (
            <Cards3 key={index} {...card} cardIcon={true} />
          ))}
        </div>

        <div className="flex flex-col flex-wrap gap-4">
          <p className={`text-3xl ${styles.card2_text}`} style={{ fontFamily: "IvyMode" }}>
            Today's recommendations for you, Charlie!
          </p>
          <div className="flex flex-wrap gap-4">
            <Slider3 cards={card5Data} />
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-4">
          <p className={`text-4xl ${styles.card2_text}`}>
            Charlie, we have find some recommendation for you
          </p>
          <div className="flex flex-wrap gap-4  mx-16">
            {card3Data.map((card, index) => (
              <Cards3 key={index} {...card} cardIcon={false} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Faviorates;
