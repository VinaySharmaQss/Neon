import React from 'react'
import styles from "./Cards8.module.css"
import { IoIosStar } from "react-icons/io";
import Images from "../../../../assets/img/card2_2.jpg"
import Overhelmed from "../../../../assets/img/overwhelmed.svg"
import Disappoint from "../../../../assets/img/disappointed.svg"
import Bore from  "../../../../assets/img/boredom.svg"
import Anger from "../../../../assets/img/anger.svg"
import Appreciation from "../../../../assets/img/appreciation.svg"
const Cards8 = ({feedback}) => {
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
        
        </p>
        <div>
         <div className={styles.icons }>
           <img src={Overhelmed} alt="" className={styles.icon_image}/>
         </div>
        </div>
      </div>

    </div>
  )
}

export default Cards8