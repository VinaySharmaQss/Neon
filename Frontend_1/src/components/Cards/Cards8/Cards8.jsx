import React from 'react'
import styles from "./Cards8.module.css"
import { IoIosStar } from "react-icons/io";
import Images from "../../../../assets/img/card2_2.jpg"
import Overhelmed from "../../../../assets/img/overwhelmed.svg"
import Disappoint from "../../../../assets/img/disappointed.svg"
import Bore from  "../../../../assets/img/boredom.svg"
import Anger from "../../../../assets/img/anger.svg"
import Joy from "../../../../assets/img/joy.svg"
import Appreciation from "../../../../assets/img/appreciation.svg"
const Cards8 = ({feedback=true,active=1}) => {
  

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={Images} alt=""  className={styles.img}/>
        <div className={styles.leftContent}>
        <div className={styles.leftTitle}>
            Men's Golf League
         </div>
         <div className={styles.date}>
           Nov 10-29, 2023
         </div>
         <div className={styles.rating}>
          <div className={styles.ratingNum}>123 reviews</div>
          <div className={styles.stars}>
            <IoIosStar fill='#FFEE00'/>
             <span className='mt-1'>5.0</span>
          </div>
         </div>
        </div>
      </div>


      <div className={styles.right}>
        <div className={styles.rightDate}>
          Nov 10-29, 2023
        </div>
        <div className={styles.rightTitle}>
        Great experience!
        </div>
        <p className={styles.description}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elit.
        </p>
        <div>
          {feedback?
         <div className={styles.icons }>
           <img src={Overhelmed} alt="" className={`${styles.icon_image} ${active === 1 ? styles.active : ''}`}/>
           <img src={Joy} alt=""  className={`${styles.icon_image} ${active === 2 ? styles.active : ''}`}/>
           <img src={Bore} alt=""  className={`${styles.icon_image} ${active === 3 ? styles.active : ''}`}/>
           <img src={Appreciation} alt="" className={`${styles.icon_image} ${active === 4 ? styles.active : ''}`}/>
           <img src={Disappoint} alt="" className={`${styles.icon_image} ${active === 5 ? styles.active : ''}`}/>
           <img src={Anger} alt="" className={`${styles.icon_image} ${active === 6 ? styles.active : ''}`}/>
         </div>
         :
         <button className='w-[112px] h-[33px] bg-black text-white rounded-sm text-[12px]'
         style={{fontFamily:"BrownRegular"}}>
           Add a review
         </button>
          }
        </div>
      </div>

    </div>
  )
}

export default Cards8