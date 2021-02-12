import React, { useEffect, useState } from "react";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Card,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents/dist/Assets.js";
import { ProductSwitch } from "@ui5/webcomponents-react/lib/ProductSwitch";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package

import { firestore } from "../firebase/firebase.utils";

import Map from "../components/map/map.component";

export function ReportIssue() {
  const [issueList, setIssueList] = useState([]);

  useEffect(() => {
    async function fetchIssues() {
      const collectionRef = await firestore.collection("issues");
      const snapshot = await collectionRef.get();
      const transformedCollection = await snapshot.docs.map((doc) => {
        const { Description, Location } = doc.data();
        return {
          Description,
          Location,
        };
      });
      setIssueList(transformedCollection);
    }
    fetchIssues();
  }, []);

  return <Map issueArray={issueList} page={"ReportIssue"}></Map>;
}
