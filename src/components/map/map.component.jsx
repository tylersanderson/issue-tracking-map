import React, { useState, useEffect, useContext, memo, useRef } from "react";
import IssueInformation from "../issue-information/issue-information.component";
import { Dialog } from "@ui5/webcomponents-react/lib/Dialog";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  FlexBoxWrap,
  Card,
  Button,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import GoogleMapReact from "google-map-react";
import MarkerWithStick from "./marker.jsx";
import { K_CIRCLE_SIZE, K_STICK_SIZE } from "./marker-styles.js";

const Map = memo(({ issueArray, page }) => {
  const [selectedLat, setSelectedLat] = useState([]);
  const [selectedLng, setSelectedLng] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState([]);

  //const { setSelectedIssueContext } = useContext(IssueSelectedContext);

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

  const dialogRef = useRef();
  const handleSelectedIssue = (key, childProps) => {
    const markerId = childProps; //.marker.get("id");
    console.log(markerId.id);
    const issueSelected = findIssue(markerId.id, issueArray);
    setSelectedIssue(issueSelected);
    dialogRef.current.open();
    // const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    // if (this.props.onChildClick) {
    //   this.props.onChildClick(index);
    // }
  };

  const findIssue = (issueID, issueListArray) => {
    for (var i = 0; i < issueListArray.length; i++) {
      if (issueListArray[i].id === issueID) {
        return issueListArray[i];
      }
    }
  };

  console.log(selectedIssue);
  console.log(page);

  return (
    // Important! Always set the container height explicitly
    <div style={{ width: "100%" }}>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Stretch}
        wrap={FlexBoxWrap.Wrap}
        //style={spacing.sapUiContentPadding}
      >
        <Card
          heading={
            page === "HomePage"
              ? "Open Issues"
              : "Report New Issue - Select Location"
          }
          style={{
            "max-width": "600px",
            ...spacing.sapUiContentPadding,
          }}
        >
          <div style={{ height: "80vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              }}
              defaultCenter={{ lat: 40.81, lng: -96.65 }}
              defaultZoom={12}
              hoverDistance={K_CIRCLE_SIZE / 2}
              distanceToMouse={distanceToMouse}
              onChildClick={handleSelectedIssue}
              onClick={({ x, y, lat, lng, event }) => {
                console.log(x, y, lat, lng, event);
                setSelectedLat(lat);
                setSelectedLng(lng);
              }}
            >
              {page === "ReportIssue" ? (
                <MarkerWithStick
                  lat={selectedLat}
                  lng={selectedLng}
                  text={"New"}
                />
              ) : null}
              {issueArray.map((issue, i) => (
                <MarkerWithStick
                  key={i}
                  lat={issueArray[i].Location.latitude}
                  lng={issueArray[i].Location.longitude}
                  text={String(i)}
                  id={issueArray[i].id}
                />
              ))}
            </GoogleMapReact>
          </div>
        </Card>
        {page === "HomePage" ? (
          <div style={{ width: "600px" }}>
            <IssueInformation issueArray={issueArray} />
          </div>
        ) : null}
        <div>
          <Dialog
            ref={dialogRef}
            footer={
              <Button onClick={() => dialogRef.current.close()}>Close</Button>
            }
            headerText="Issue Info"
          >
            {selectedIssue.Description}
          </Dialog>
        </div>
      </FlexBox>
    </div>
  );
});

export default Map;
