import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Image from "../../../assets/img/mountain.jpg";
import Icon from "../../../assets/img/joy.svg";
import {ImageGrid} from "../../components/ImageGrid/ImageGrid";
import Footer from "../../components/Footer/Footer";
import styles from "./EventDetails.module.css";
import Card6 from "../../components/Cards/Cards6/Card";
import { BiCategory } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import {   card3_1Data, reviews } from "../../constants/data";
import Slider4 from "../../components/Slider/Slider4";
import Cards3 from "../../components/Cards/Cards3/Cards3";

const EventDetails = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col px-12">
        <h1 className={styles.heading}>Round of Golf</h1>
        <div className={styles.reviews}>
          <div className={styles.stars}>★★★★★</div>
          <div className={styles.reviewNum}>4.5  (23 reviews)</div>
          <div className={styles.reviewCity}>Sindalah City, Dubai</div>
        </div>
      </div>
      <div className={styles.Images}>
        <div className={styles.scheduled}>
          scheduled
        </div>
        <ImageGrid Image={Image} />
      </div>

      <div className={styles.description}>
        <div className={styles.content}>
          <h1>About the Event</h1>
           <div className={styles.eventDetails}>
            <div className={styles.eventContent}>
            <div className={styles.icon}>
                <BiCategory/>
             </div>
             <div className={styles.eventTitle}>
                 Golf
             </div>
            </div>
             <div className={styles.eventDescription}>
               This is one of the primary category comes under  the Golf category
             </div>
           </div>

           <div className={styles.eventDetails}>
            <div className={styles.eventContent}>
            <div className={styles.icon}>
                <CiLocationOn/>
             </div>
             <div className={styles.eventTitle}>
             Great location
             </div>
            </div>
             <div className={styles.eventDescription}>
             Every guest has given a five star rating to this location.
             </div>
           </div>

           <div className={styles.eventDetails}>
            <div className={styles.eventContent}>
            <div className={styles.image}>
                <img src={Icon} alt="Image" className="h-6 object-cover" />
             </div>
             <div className={styles.eventTitle}>
             Invigorating & uplifting experience
             </div>
              </div>
             <div className={styles.eventDescription}>
             This event has a rating of 5.0 that make this event overwhelmed.
             </div>
           </div>

         <div className={styles.para}>
         <p className={` ${styles.eventDescription}`}>
           Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit.
           </p>
           <p className={styles.eventDescription}>
           Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit.
           </p>
         </div>
        </div>


        <div className="flex flex-col items-center" style={{  marginRight: "120px",}}>
        <div className={styles.box}>
           <Card6/>
        </div>
        <p
        style={
          {
            font:"BrownRegular"
          }
        }
        >Need help ?</p>
        </div>
      
      </div>
      <div className="flex flex-col relative mb-10 ml-40">
        <h1 className={styles.heading} style={{fontFamily:"IvyMode"}}>Round of Golf</h1>
        <div className={styles.reviews}>
          <div className={styles.stars}>★★★★★</div>
          <div className={styles.reviewNum} style={{fontFamily:"BrownRegular"}} >4.5  (23 reviews)</div>

        </div>
        <p className={styles.reviewText} style={{fontFamily:"BrownRegular"}}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit.
          </p>
      </div>
      <div className={styles.reviewCard}>
          <Slider4 cards={reviews} />
      </div>

      <div className={styles.content} style={{fontFamily:"IvyMode", marginLeft:"45px"}}>
        <h1 >Recommendations</h1>
      </div>
      <div className="grid grid-cols-5 mr-24 ml-12">
          {card3_1Data.map((card, index) => (
           index<10 && <Cards3 key={index} {...card} cardIcon={false} />
          ))}
        </div>
      <Footer/>
    </>
  );
};

export default EventDetails;
