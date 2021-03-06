import React, { useState, useEffect, useContext, memo, useRef } from "react";
import CurrentLocationContext from "../../contexts/current-location/current-location.context";
import IssueInformation from "../issue-information/issue-information.component";
import IssueReportForm from "../issue-report-form/issue-report-form.component";
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
import { PulsatingCircle } from "./pulsating-circle.styles.js";
import { IssueInformationContainer } from "./map.styles.js";

const Map = ({ issueArray, page }) => {
  const {
    currentPosition,
    snapCurrentPosition,
    showCurrentPosition,
  } = useContext(CurrentLocationContext);
  const [selectedLat, setSelectedLat] = useState([]);
  const [selectedLng, setSelectedLng] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState([]);
  const [selectedIssueLat, setSelectedIssueLat] = useState([]);
  const [selectedIssueLng, setSelectedIssueLng] = useState([]);
  const [snapIssuePosition, setSnapIssuePosition] = useState(false);

  useEffect(() => {});

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
    const markerId = childProps;
    //console.log(markerId.id);
    const issueSelected = findIssue(markerId.id, issueArray);
    setSelectedIssue(issueSelected);
    if (page === "HomePage") {
      dialogRef.current.open();
    }
  };

  const findIssue = (issueID, issueListArray) => {
    for (var i = 0; i < issueListArray.length; i++) {
      if (issueListArray[i].id === issueID) {
        return issueListArray[i];
      }
    }
  };

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
            maxWidth: "800px",
            maxHeight: "80vh",
            ...spacing.sapUiContentPadding,
          }}
        >
          <div style={{ height: "73vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              }}
              defaultCenter={{ lat: 40.81, lng: -96.65 }}
              center={(function centerMap() {
                if (snapCurrentPosition) {
                  return { lat: currentPosition.lat, lng: currentPosition.lng };
                } else if (snapIssuePosition) {
                  return { lat: selectedIssueLat, lng: selectedIssueLng };
                }
              })()}
              defaultZoom={12}
              hoverDistance={K_CIRCLE_SIZE / 2}
              distanceToMouse={distanceToMouse}
              onChildClick={handleSelectedIssue}
              onClick={({ x, y, lat, lng, event }) => {
                //console.log(x, y, lat, lng, event);
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
                  lat={issueArray[i].location.latitude}
                  lng={issueArray[i].location.longitude}
                  text={String(i + 1)}
                  id={issueArray[i].id}
                />
              ))}
              {currentPosition.lat && showCurrentPosition && (
                <PulsatingCircle
                  lat={currentPosition.lat}
                  lng={currentPosition.lng}
                  //text={"You"}
                />
              )}
            </GoogleMapReact>
          </div>
        </Card>
        {page === "HomePage" ? (
          <div>
            <IssueInformationContainer>
              <IssueInformation
                issueArray={issueArray}
                setSnapIssuePosition={setSnapIssuePosition}
                setSelectedIssueLat={setSelectedIssueLat}
                setSelectedIssueLng={setSelectedIssueLng}
              />
            </IssueInformationContainer>
            <div>
              <Dialog
                ref={dialogRef}
                footer={
                  <Button onClick={() => dialogRef.current.close()}>
                    Close
                  </Button>
                }
                headerText="Issue Info"
              >
                {selectedIssue.description}
                <br></br>
                <br></br>
                Reported by: {selectedIssue.createdBy}
                <br></br>
                <br></br>
                Date Reported:{" "}
                {selectedIssue.createdAt
                  ? selectedIssue.createdAt.toDate().toDateString()
                  : null}
              </Dialog>
            </div>
          </div>
        ) : null}
        {page === "ReportIssue" && selectedLat > 0 ? (
          <div>
            <IssueReportForm
              selectedLat={selectedLat}
              selectedLng={selectedLng}
            />
          </div>
        ) : null}
      </FlexBox>
    </div>
  );
};

export default Map;
