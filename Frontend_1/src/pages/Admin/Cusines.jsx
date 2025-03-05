import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../../utils/utils";
import toast from "react-hot-toast";

const Cusines = function () {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [userId, setUserId] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      setUserId(user.id);
    } else {
      toast.error("User should be logged in");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !logo ||
      !image ||
      !formData.title ||
      !formData.date ||
      !formData.description ||
      !userId
    ) {
      setMessage("All fields are required!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", new Date(formData.date).toISOString());
    data.append("description", formData.description);
    data.append("userId", userId);
    data.append("logo", logo);
    data.append("image", image);

    try {
      const res = await axios.post(`${backendUrl}cuisines/create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setMessage("Cuisine added successfully!");
        setFormData({ title: "", date: "", description: "" });
        setLogo(null);
        setLogoPreview("");
        setImage(null);
        setImagePreview("");
      } else {
        toast.error(res.data.message);
        setMessage("Error adding cuisine. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding cuisine. Try again.");
      setMessage("Error adding cuisine. Try again.");
    }
  };

  return (
    <div
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      style={{ marginTop: "4rem", fontFamily: "BrownRegular" }}
    >
      <h2 className="text-xl font-bold mb-4">Create a New Cuisine</h2>

      {message && <p className="text-center text-sm mb-3 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Cuisine Title"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Cuisine Description"
          required
          className="w-full p-2 border rounded"
        ></textarea>

        {/* Logo Upload Field */}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          required
          className="w-full p-2 border rounded"
        />
        {logoPreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Logo Preview:</p>
            <img
              src={logoPreview}
              alt="Cuisine Logo"
              className="h-24 w-24 object-cover mt-2 rounded"
            />
          </div>
        )}

        {/* Image Upload Field */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full p-2 border rounded"
        />
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Cuisine Image"
              className="h-24 w-24 object-cover mt-2 rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Create Cuisine
        </button>
      </form>
    </div>
  );
};

export default Cusines;
