import React, { useState } from "react";
//import { PropTypes, Component } from "react";
//import './Map.css';
import GoogleMapReact from "google-map-react";

import MyGreatPlaceWithStick from "./my_great_place_with_stick.jsx";

import {
  K_CIRCLE_SIZE,
  K_STICK_SIZE,
} from "./my_great_place_with_hover_styles.js";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

const Wrapper = ({ text }) => <div>{text}</div>;

export function Map() {
  const [selectedLat, setSelectedLat] = useState([]);
  const [selectedLng, setSelectedLng] = useState([]);

  const distanceToMouse = (markerPos, mousePos, markerProps) => {
    const x = markerPos.x;
    // because of marker non symmetric,
    // we transform it central point to measure distance from marker circle center
    // you can change distance function to any other distance measure
    const y = markerPos.y - K_STICK_SIZE - K_CIRCLE_SIZE / 2;

    // and i want that hover probability on markers with text === 'A' be greater than others
    // so i tweak distance function (for example it's more likely to me that user click on 'A' marker)
    // another way is to decrease distance for 'A' marker
    // this is really visible on small zoom values or if there are a lot of markers on the map
    const distanceKoef = markerProps.text !== "A" ? 1.5 : 1;

    // it's just a simple example, you can tweak distance function as you wish
    return (
      distanceKoef *
      Math.sqrt(
        (x - mousePos.x) * (x - mousePos.x) +
          (y - mousePos.y) * (y - mousePos.y)
      )
    );
  };

  //const { ordernumber, orderlat, orderlong } = this.props;
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
              <MyGreatPlaceWithStick
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
