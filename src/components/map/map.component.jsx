import React, { useState, useEffect, useContext, memo } from "react";
import IssueInformation from "../issue-information/issue-information.component";
import { NotificationListGroupItem } from "@ui5/webcomponents-react/lib/NotificationListGroupItem";
import { NotificationListItem } from "@ui5/webcomponents-react/lib/NotificationListItem";
import { NotificationAction } from "@ui5/webcomponents-react/lib/NotificationAction";
import { Avatar } from "@ui5/webcomponents-react/lib/Avatar";
//import { MDXCreateElement } from "@ui5/webcomponents-react/lib/MDXCreateElement";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  FlexBoxWrap,
  Card,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import GoogleMapReact from "google-map-react";
import MarkerWithStick from "./marker.jsx";
import { K_CIRCLE_SIZE, K_STICK_SIZE } from "./marker-styles.js";

import { firestore } from "../../firebase/firebase.utils";

const areEqual = ({ state: prev }, { state: next }) =>
  JSON.stringify(prev) !== JSON.stringify(next);

const Map = memo(({ issueArray, page }) => {
  const [selectedLat, setSelectedLat] = useState([]);
  const [selectedLng, setSelectedLng] = useState([]);
  const [issueList, setIssueList] = useState([]);
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

  const handleSelectedIssue = (key, childProps) => {
    const markerId = childProps; //.marker.get("id");
    console.log(markerId.id);
    setSelectedIssue(markerId.id);
    // const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    // if (this.props.onChildClick) {
    //   this.props.onChildClick(index);
    // }
  };

  // useEffect(() => {
  //   async function fetchIssues() {
  //     const collectionRef = await firestore.collection("issues");
  //     const snapshot = await collectionRef.get();
  //     const transformedCollection = await snapshot.docs.map((doc) => {
  //       const { Description, Location } = doc.data();
  //       return {
  //         Description,
  //         Location,
  //       };
  //     });
  //     setIssueList(transformedCollection);
  //   }
  //   fetchIssues();
  // }, []);

  return (
    // Important! Always set the container height explicitly
    <div style={{ width: "100%" }}>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Stretch}
        wrap={FlexBoxWrap.Wrap}
        //style={spacing.sapUiContentPadding}
      >
        <div style={{ width: "300px" }}>
          <NotificationListGroupItem
            actions={
              <div>
                <NotificationAction icon="accept" text="Accept all" />
                <NotificationAction icon="message-error" text="Reject all" />
              </div>
            }
            className=""
            heading="Orders"
            onClose={function noRefCheck() {}}
            onToggle={function noRefCheck() {}}
            showClose
            showCounter
            slot=""
            style={{}}
            tooltip=""
          >
            <NotificationListItem
              actions={
                <div>
                  <NotificationAction icon="accept" text="Accept" />
                  <NotificationAction icon="message-error" text="Reject" />
                </div>
              }
              avatar={
                <Avatar
                  image="https://sap.github.io/ui5-webcomponents/assets/images/avatars/woman_avatar_1.png"
                  size="XS"
                />
              }
              footnotes={<div></div>}
              heading="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
              priority="Medium"
            >
              And with a very long description and long labels of the action
              buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Praesent feugiat, turpis vel scelerisque pharetra, tellus odio
              vehicula dolor, nec elementum lectus turpis at nunc.
            </NotificationListItem>
            <NotificationListItem
              actions={
                <div>
                  <NotificationAction icon="accept" text="Accept" />
                  <NotificationAction icon="message-error" text="Reject" />
                </div>
              }
              avatar={
                <Avatar
                  image="https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_1.png"
                  size="XS"
                />
              }
              footnotes={<div></div>}
              heading="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
              priority="High"
              showClose
            >
              And with a very long description and long labels of the action
              buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Praesent feugiat, turpis vel scelerisque pharetra, tellus odio
              vehicula dolor, nec elementum lectus turpis at nunc.
            </NotificationListItem>
          </NotificationListGroupItem>
        </div>
        <Card
          heading="Name"
          style={{
            "max-width": "800px",
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
              {page === "reportIssuePage" ? (
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

        <Card
          heading="Name"
          style={{
            display: "flex",
            "max-width": "800px",
            //"min-width": "200px",

            //flex: "0 0 auto",
            //width: "350px",
            height: "50%",
            ...spacing.sapUiContentPadding,
          }}
        >
          <IssueInformation
            issueArray={issueList}
            selectedIssue={selectedIssue}
          />
        </Card>
      </FlexBox>
    </div>
  );
});

export default Map;
