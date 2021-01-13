import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import MarkerWithStick from "./marker.jsx";
import { K_CIRCLE_SIZE, K_STICK_SIZE } from "./marker-styles.js";

export function Map() {
  const [selectedLat, setSelectedLat] = useState([]);
  const [selectedLng, setSelectedLng] = useState([]);

  const distanceToMouse = (markerPos, mousePos, markerProps) => {
    const x = markerPos.x;
    // because of marker non symmetric,
    // we transform it central point to measure distance from marker circle center
    const y = markerPos.y - K_STICK_SIZE - K_CIRCLE_SIZE / 2;

    // and i want that hover probability on markers with text === 'A' be greater than others
    // so i tweak distance function (for example it's more likely to me that user click on 'A' marker)
    // another way is to decrease distance for 'A' marker
    // this is really visible on small zoom values or if there are a lot of markers on the map
    const distanceKoef = markerProps.text !== "A" ? 1.5 : 1;

    return (
      distanceKoef *
      Math.sqrt(
        (x - mousePos.x) * (x - mousePos.x) +
          (y - mousePos.y) * (y - mousePos.y)
      )
    );
  };

  return (
    // Important! Always set the container height explicitly
    <div>
      <article>
        <main>
          <div style={{ height: "80vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              }}
              defaultCenter={{ lat: 40.81, lng: -96.65 }}
              defaultZoom={12}
              hoverDistance={K_CIRCLE_SIZE / 2}
              distanceToMouse={distanceToMouse}
              onClick={({ x, y, lat, lng, event }) => {
                console.log(x, y, lat, lng, event);
                setSelectedLat(lat);
                setSelectedLng(lng);
              }}
            >
              <MarkerWithStick
                lat={selectedLat}
                lng={selectedLng}
                text={"1234"}
              />
            </GoogleMapReact>
          </div>
        </main>
      </article>
    </div>
  );
}

export default Map;
