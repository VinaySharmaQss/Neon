import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../utils/utils";
import toast from "react-hot-toast";
import styles from "./PlaceForm.module.css";

const PlaceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    temperature: "",
    rating: "0", 
    description: "",
    eventTime: "",
    eventEndTime: "",
    category: "",
    location: "",
    eventType: "",
    footerDescription: "",
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [footerLogoFile, setFooterLogoFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [footerLogoPreview, setFooterLogoPreview] = useState(null);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "mainImage") {
        setMainImageFile(files[0]);
        setMainImagePreview(URL.createObjectURL(files[0]));
      } else if (name === "footerLogo") {
        setFooterLogoFile(files[0]);
        setFooterLogoPreview(URL.createObjectURL(files[0]));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that all required fields are provided
    if (
      !formData.title ||
      !formData.temperature ||
      !formData.rating ||
      !formData.description ||
      !formData.eventTime ||
      !formData.location ||
      !formData.eventType ||
      !formData.footerDescription ||
      !mainImageFile ||
      !footerLogoFile ||
      !eventEndTime ||
      !category
    ) {
      toast.error("All fields are required");
      return;
    }

    // Create FormData for multipart/form-data request
    const data = new FormData();
    data.append("title", formData.title);
    data.append("temperature", formData.temperature);
    data.append("rating", parseFloat(formData.rating)); // Convert rating to float
    data.append("description", formData.description);
    // Convert eventTime to ISO string
    data.append("eventTime", new Date(formData.eventTime).toISOString());
    data.append("location", formData.location);
    data.append("eventType", formData.eventType);
    data.append("footerDescription", formData.footerDescription);
    data.append("eventEndTime", new Date(formData.eventEndTime).toISOString());
    data.append("category", formData.category);
    data.append("mainImage", mainImageFile);
    data.append("footerLogo", footerLogoFile);

    try {
      const response = await axios.post(`${backendUrl}places/create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Place created successfully!");
        // Reset the form
        setFormData({
          title: "",
          temperature: "",
          rating: "3",
          description: "",
          eventTime: "",
          location: "",
          eventType: "",
          footerDescription: "",
        });
        setMainImageFile(null);
        setFooterLogoFile(null);
        setMainImagePreview(null);
        setFooterLogoPreview(null);
      } else {
        toast.error("Failed to create place.");
      }
    } catch (error) {
      console.error("Error creating place:", error);
      toast.error("Error creating place. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Place</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="mainImage">Main Image</label>
          <input 
            type="file" 
            id="mainImage" 
            name="mainImage" 
            accept="image/*" 
            onChange={handleFileChange} 
            required 
          />
          {mainImagePreview && (
            <div className={styles.preview}>
              <img src={mainImagePreview} alt="Main Preview" />
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="temperature">Temperature</label>
          <input 
            type="text" 
            id="temperature" 
            name="temperature" 
            value={formData.temperature} 
            onChange={handleChange} 
            placeholder="e.g., 18" 
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="rating">
            Rating: <span className={styles.ratingValue}>{formData.rating}</span>
          </label>
          <input 
            type="range" 
            id="rating" 
            name="rating" 
            value={formData.rating} 
            onChange={handleChange} 
            min="1" 
            max="5" 
            step="0.1" 
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          ></textarea>
        </div>

        <div className={styles.field}>
          <label htmlFor="eventTime">Event Start </label>
          <input 
            type="datetime-local" 
            id="eventTime" 
            name="eventTime" 
            value={formData.eventTime} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="eventTime">Event End Time </label>
          <input 
            type="datetime-local" 
            id="eventEndTime" 
            name="eventEndTime" 
            value={formData.eventEndTime} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="location">Location</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            required 
          />
        </div>

         <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required> 
            <option value="">Select a category</option>
            <option value="Standup Comedy">StandupCategory</option>
            <option value="Ramp Walk">Ramp Walk</option>
            <option value="Box Cricket">Box Cricket</option>
            <option value="Cricket" >Cricket</option>
            <option value="Golf tornament">Golf tournament</option>
            <option value="Singing">Singing</option>
           <option value="Talk Show">Talk Show</option>
           <option value="Kite Surfing">Kite Surfing</option>
           <option value="Box Exihibtion">Box Exhibition</option>         
         </select>
         </div>

        <div className={styles.field}>
          <label htmlFor="eventType">Event Type</label>
          <input 
            type="text" 
            id="eventType" 
            name="eventType" 
            value={formData.eventType} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="footerLogo">Footer Logo</label>
          <input 
            type="file" 
            id="footerLogo" 
            name="footerLogo" 
            accept="image/*" 
            onChange={handleFileChange} 
            required 
          />
          {footerLogoPreview && (
            <div className={styles.preview}>
              <img src={footerLogoPreview} alt="Footer Logo Preview" />
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="footerDescription">Footer Description</label>
          <textarea 
            id="footerDescription" 
            name="footerDescription" 
            value={formData.footerDescription} 
            onChange={handleChange} 
            required 
          ></textarea>
        </div>

        <button type="submit">Create Place</button>
      </form>
    </div>
  );
};

export default PlaceForm;
