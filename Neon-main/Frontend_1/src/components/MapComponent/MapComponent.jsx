import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { HiLocationMarker } from "react-icons/hi";
import ReactDOMServer from "react-dom/server";
import ModalComponent from "../../components/Modal/EventModal"; // Updated import
import Golf from "../../../assets/img/chinese.png";
import Cooking from "../../../assets/img/cooking.jpg";
import { useState } from "react";

// ...existing code...
 
const locations = [
  {
    id: 1,
    name: "Golf Tournament",
    image: Golf,
    lat: 28.051561,
    lng: 34.715805,
  },
  { id: 2, name: "Cooking", image: Cooking, lat: 28.048796, lng: 34.717427 },
];
 
const createCustomIcon = () =>
  new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <HiLocationMarker style={{ color: "red", fontSize: "24px" }} />
    ),
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
 
const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
 
  return (
    <div
      style={{
        borderRadius: "0.8rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MapContainer
        center={[28.047345, 34.712805]}
        zoom={16}
        style={{ height: "30vw", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        />
 
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon()}
            eventHandlers={{ click: () => setSelectedLocation(location) }}
          >
            <Popup closeButton={false}style={{margin:'0 !important'}} >
            <div
                style={{
                  width: "10rem",
                  height: "6rem",
                  // padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
              {selectedLocation && selectedLocation.id === location.id && (
                <div>
                  <ModalComponent
                    location={selectedLocation}
                    onClose={() => setSelectedLocation(null)}
                    />
                </div>
              )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
 
export default MapComponent;