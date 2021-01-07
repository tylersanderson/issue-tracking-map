import React from "react";
//import './Map.css';
import GoogleMapReact from "google-map-react";

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
              defaultCenter={{ lat: 59.95, lng: 30.33 }}
              defaultZoom={16}
            >
              <AnyReactComponent lat={59.95} lng={30.33} text={"test"} />
            </GoogleMapReact>
          </div>
        </main>
      </article>
    </div>
  );
}

export default Map;
