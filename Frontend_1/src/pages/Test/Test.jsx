import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../../utils/utils";
import Cards1 from "../../components/Cards/Cards1/Cards1";   
import Cusines from "../Admin/Cusines";

const Test = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, { withCredentials: true });
        console.log(response.data.message);
        if (response.data.success) {
          setPlaces(response.data.message);
          toast.success(response.data.data || "Places fetched successfully");
        } else {
          setError("Failed to load places");
          toast.error("Failed to load places");
        }
      } catch (err) {
        console.error("Error fetching places:", err);
        setError("Error fetching places");
        toast.error("Error fetching places");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading)
    return (
      <div className="text-center text-lg font-medium mt-10">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        {error}
      </div>
    );
  if (places.length === 0)
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        No places available.
      </div>
    );

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {places.map((place) => (
        <Cards1
          key={place.id}
          mainImage={place.mainImage}
          // Provide a default weather logo (since it's not part of your model)
          weatherLogo={"https://via.placeholder.com/50"}
          temperature={place.temperature}
          title={place.title}
          rating={place.rating}
          ratingNum={place.rating.toFixed(1)}
          reviews={`(${place.reviews?.length || 0})`}
          description={place.description}
          readMore={" read more"}
          // Construct dummy events from the available data
          events={[
            { description: place.location },
            { description: place.eventType },
            { description: "Event" },
          ]}
          footerLogo={place.footerLogo}
          footerDescription={place.footerDescription}
          footerLink={"Schedule"}
        />
      ))}
    </div>
  <Cusines/>
    </>
  );
};

export default Test;
