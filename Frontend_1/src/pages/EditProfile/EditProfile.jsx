import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "../../../assets/img/socializing.png";
import styles from "./EditProfile.module.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import card1 from "../../../assets/img/card2_1.jpg";
import card2 from "../../../assets/img/card2_2.jpg";
import card3 from "../../../assets/img/card3_3.jpg";
import card4 from "../../../assets/img/card4_4.jpg";
import card5 from "../../../assets/img/card4_5.jpg";
import card6 from "../../../assets/img/card4_2.jpg";
import card7 from "../../../assets/img/card4_3.jpg";
import card8 from "../../../assets/img/card3_1.jpg";
import card9 from "../../../assets/img/card3_2.jpg";
import card10 from "../../../assets/img/card3_3.jpg";
import { backendUrl } from "../../utils/utils";
import { useParams } from "react-router";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    interests: "",
    Image: "",
  });

  const [selected, setSelected] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Helper function to format date to "yyyy-MM-dd"
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}user/${id}`);
        const userData = response.data?.data;
        if (userData) {
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phoneNumber || "",
            birthday: userData.DOB ? formatDate(userData.DOB) : "",
            interests: userData.interests ? userData.interests.join(", ") : "",
            Image: userData.Image || "",
          });
          setSelected(userData.interests || []); // Prefill interests
        }
      } catch (error) {
        console.error("Get user data error:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

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
    { name: "Water sports", img: card1 },
  ];

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      interests: selected.join(", "),
    }));
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Handle manual interest entry from input
    if (name === "interests") {
      const updatedInterests = value
        .split(",")
        .map((interest) => interest.trim());
      setSelected(updatedInterests);
    }
  };

  // Handle file selection for profile image update
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prevState) => ({
        ...prevState,
        Image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Convert birthday to ISO-8601 string
    const formattedDOB = formData.birthday
      ? new Date(formData.birthday).toISOString()
      : "";

    try {
      let response;
      if (imageFile) {
        // Create FormData to send file and other fields
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("phoneNumber", formData.phone);
        formDataObj.append("DOB", formattedDOB);
        formDataObj.append("interests", JSON.stringify(selected));
        formDataObj.append("Image", imageFile);
        response = await axios.put(
          `${backendUrl}user/update/${id}`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        const payload = {
          name: formData.name,
          phoneNumber: formData.phone,
          DOB: formattedDOB,
          interest: selected,
        };
        console.log("Payload:", payload);
        response = await axios.put(`${backendUrl}user/update/${id}`, payload);
      }

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        const updatedUser = response.data.data;
        if (updatedUser) {
          setFormData({
            name: updatedUser.name || "",
            email: updatedUser.email || "",
            phone: updatedUser.phoneNumber || "",
            birthday: updatedUser.DOB ? formatDate(updatedUser.DOB) : "",
            interests: updatedUser.interests
              ? updatedUser.interests.join(", ")
              : "",
            Image: updatedUser.Image || "",
          });
          setSelected(updatedUser.interests || []);
          setImageFile(null);
        }
      } else {
        toast.error("Failed to update profile.");
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
      setMessage("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.title}>Edit Charlie&apos;s Profile</div>
          <div className={styles.content}>
            <div
              className={styles.imgWrapper}
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={formData.Image || Image}
                alt="profile"
                className={styles.img}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
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
                readOnly
                style={{ backgroundColor: "#D3D3D3" }}
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
                When can we wish you a happy birthday?
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
                  className={`${styles.card} ${
                    selected.includes(name) ? styles.selected : ""
                  }`}
                  onClick={() => toggleInterest(name)}
                >
                  <img src={img} alt={name} className={styles.image} />
                  <span>{name}</span>
                </div>
              ))}
            </div>

            <label
              htmlFor="interests"
              style={{ marginLeft: "12.5vw", fontSize: "12px" }}
            >
              Please let us know if you have some interests
            </label>
            <input
              id="interests"
              type="text"
              placeholder="Add multiple interests comma ( , ) separated"
              className={styles.inputs}
              name="interests"
              value={formData.interests}
              onChange={handleChange}
            />

            {message && <p className={styles.message}>{message}</p>}

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md shadow-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;