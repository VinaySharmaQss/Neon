import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Cards3 from "../../components/Cards/Cards3/Cards3";
import { card2_1Data, card3Data, card5Data } from "../../constants/data";
import styles from "./Faviorates.module.css";
import Card5 from "../../components/Cards/Card5/Card5";
import Slider3 from "../../components/Slider/Slider3";
import { useSelector } from "react-redux";

const Faviorates = () => {
    const userName = useSelector((state) => state.user?.user?.name) 
                ?? JSON.parse(localStorage.getItem("user"))?.name 
                ?? "Guest";
  return (
    
    <>
      <header>
        <Navbar />
        <div className="mx-[50px] my-8">
          <h1 className="text-[26px] mt-2.5" style={{ fontFamily: "IvyMode" }}>
            Good Morning {userName}!
          </h1>
          <p
            className="font-brown text-[17px]  "
            style={{ fontFamily: "BrownRegular" }}
          >
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
          <p
            className={`text-[26px] ${styles.card2_text}`}
            style={{ fontFamily: "IvyMode" }}
          >
            Today&apos;s recommendations for you, {userName}!
          </p>
          <div className="flex flex-wrap gap-4">
            <Slider3 cardsData={card5Data} CardComponent={Card5} />
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-4">
          <p className={`text-[26px] ${styles.card2_text}`}>
            {userName}, we have find some recommendation for you
          </p>
          <div className="flex flex-wrap gap-4  ml-16">
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
