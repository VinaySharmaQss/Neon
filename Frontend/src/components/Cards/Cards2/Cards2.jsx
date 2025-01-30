import React from 'react'
import styles from './Card2.module.css'
import Image from "../../../assets/img/mountain.jpg"
const Cards2 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.left_top}>
          <img src={Image} alt="" />
        </div>
        <div className={styles.left_bottom}>
          <img src="" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h2>
        Indulge in the Finest Epicurean Cuisines
        </h2>
        <p className={styles.para1}>on Nov 17, 2022</p>
        <p className={styles.para}>
        Hi Charlie, we came to from our chef John that you didn't enjoyed the Epicurean cuisines yesterday. As a compensation we would like to offer you a free Italian cuisines as a goodwill gesture. Would you like to accept our request?
        </p>
        <div className={styles.btn_group}>
          <button className={styles.btn_black}>Yes, I accept</button>
          <button className={styles.btn_white}>No, thanks</button>
        </div>
      </div>
    </div>
  )
}

export default Cards2