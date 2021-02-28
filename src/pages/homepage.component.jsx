import React, { useEffect } from "react";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import Map from "../components/map/map.component";

export function HomePage({ issueListArray }) {
  useEffect(() => {}, []);
  return <Map issueArray={issueListArray} page={"HomePage"}></Map>;
}
