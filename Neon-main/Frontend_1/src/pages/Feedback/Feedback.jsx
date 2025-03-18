import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Feedback.module.css";
import logo from "../../../assets/img/overwhelmed.svg";
import Image from "../../../assets/img/vibe-o-meter.svg";
import Cards8 from "../../components/Cards/Cards8/Cards8";
import { useSelector } from "react-redux";
const Feedback = () => {
    const userName = useSelector((state) => state.user?.user?.name) 
                  ?? JSON.parse(localStorage.getItem("user"))?.name 
                  ?? "Guest";
  return (
    <>
      <Navbar />
      <main>
        <div className={styles.container}>
          <div className={styles.right}>
            <img src={logo} alt="svg" className="h-[55px] object-cover w-[55px] " />
            <div className={styles.title}>Overwhelmed experience</div>
            <div className={styles.subTitle}>
              Your Vibe-O-Meter reading exits us too
            </div>
            <div className={styles.description}>
              We are happy too because we successfully keep you happy during
              this <br />
              visit to Sindalah City.
            </div>
          </div>
          <div className={styles.left}>
            <img
              src={Image}
              alt="Vibes"
              className="object-cover m-16 h-[180px] w-[350px] mr-24 mt-24"
            />
          </div>
        </div>

        <div className={styles.content}>
        <div className={styles.text}>
        Hi {userName},
        <br /> here are the glimpse of your feedback shared with us.
        </div>


        {/* Cards */}

        <Cards8/>
        <Cards8/>
        <Cards8/>
        <Cards8/>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Feedback;
