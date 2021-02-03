import React, { useEffect, useState, useContext } from "react";
import IssueSelectedContext from "../contexts/issue-selected/issue-selected.context";
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

export function HomePage({ issueListArray }) {
  //const [issueList, setIssueList] = useState([]);
  const { selectedIssue, setSelectedIssueContext } = useContext(
    IssueSelectedContext
  );

  useEffect(() => {
    // async function fetchIssues() {
    //   const collectionRef = await firestore.collection("issues");
    //   const snapshot = await collectionRef.get();
    //   console.log(snapshot.docs[0].id);
    //   console.log(snapshot.docs[0].data());
    //   const transformedCollection = await snapshot.docs.map((doc, i) => {
    //     const { Description, Location } = doc.data();
    //     const id = doc.id;
    //     console.log(id);
    //     console.log(doc.data());
    //     return {
    //       id,
    //       Description,
    //       Location,
    //     };
    //   });
    //   console.log(transformedCollection);
    //   setIssueList(transformedCollection);
    // }
    // fetchIssues();
  }, []);

  console.log(issueListArray);

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
      style={spacing.sapUiContentPadding}
    >
      <Card heading={selectedIssue}>
        <Map issueArray={issueListArray}></Map>
      </Card>
      <ProductSwitch></ProductSwitch>
    </FlexBox>
  );
}
