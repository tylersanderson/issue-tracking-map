import React, { useEffect, useState, useRef } from "react";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Card,
  Button,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import "@ui5/webcomponents/dist/Assets.js";
import { ProductSwitch } from "@ui5/webcomponents-react/lib/ProductSwitch";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import { firestore, fetchIssues } from "../firebase/firebase.utils";

import Map from "../components/map/map.component";

export function ReportIssue({ issueListArray }) {
  useEffect(() => {}, []);
  return <Map issueArray={issueListArray} page={"ReportIssue"}></Map>;
}
