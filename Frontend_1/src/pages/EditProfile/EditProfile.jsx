import React, { useState } from "react";
import Image from "../../../assets/img/socializing.png";
import styles from "./EditProfile.module.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import card1 from "../../../assets/img/card2_1.jpg"
import card2 from "../../../assets/img/card2_2.jpg"
import card3 from "../../../assets/img/card3_3.jpg"
import card4 from "../../../assets/img/card4_4.jpg"
import card5 from "../../../assets/img/card4_5.jpg"
import card6 from "../../../assets/img/card4_2.jpg"
import card7 from "../../../assets/img/card4_3.jpg"
import card8 from "../../../assets/img/card3_1.jpg"
import card9 from "../../../assets/img/card3_2.jpg"
import card10 from "../../../assets/img/card3_3.jpg"






const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "Charlie",
    email: "charlie@gmail.com",
    phone: "9971 87 7676",
    birthday: "1979-08-01", // ISO format for <input type="date">
  });

  const interestsData = [
    { name: "Golf", img: card1 },
    { name: "Music", img: card2 },
    { name: "Rooms", img: card3 },
    { name: "Exploring", img: card4 },
    { name: "Socializing", img: card5 },
    { name: "Cooking & dining", img: card6 },
    { name: "Plays", img: card7 },
    { name: "Chinese food", img: card8 },
    { name: "Screaming children", img: card9 },
    { name: "Walking for long", img: card10 },
    { name: "Water sports", img: card1},
  ];

  const [selected, setSelected] = useState([]);

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Handle form submission logic
  };

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.title}>Edit Charlie&apos;s Profile</div>
        <div className={styles.content}>
          <div className={styles.imgWrapper}>
            <img src={Image} alt="profile" className={styles.img} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              What should we call you?
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email" className={styles.label}>
              What&apos;s your email address?
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
              readOnly
              style={{backgroundColor: "#D3D3D3"}}
            />

            <label htmlFor="phone" className={styles.label}>
              On which number can we contact you?
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="birthday" className={styles.label}>
              When can we wish a happy birthday?
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className={styles.input}
              value={formData.birthday}
              onChange={handleChange}
            />
       </div>
            <div className={styles.grid}>
              {interestsData.map(({ name, img }) => (
                <div
                  key={name}
                  className={`${styles.card} ${selected.includes(name) ? styles.selected : ""}`}
                  onClick={() => toggleInterest(name)}
                >
                  <img src={img} alt={name} className={styles.image} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
             <label htmlFor="interests" style={{ marginLeft: "12.5vw", fontSize: "12px" }}>Please let us know if you have some interests</label>
:            <input
              id="interests"
              type="text"
              placeholder="Add multiple interests comma ( , ) separated"
              className={styles.inputs}
            />
          </div>
        
        <div className={styles.buttonContainer}>
        <button className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition">
        Save
      </button>
      <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md shadow-md hover:bg-gray-100 transition">
        Cancel
      </button>

        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default EditProfile;