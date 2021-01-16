import React, { useEffect } from "react";
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

import Map from "../components/map/map.component";

export function HomePage() {
  useEffect(() => {}, []);

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
      style={spacing.sapUiContentPadding}
    >
      <Card>
        <Map></Map>
      </Card>
      <ProductSwitch></ProductSwitch>
    </FlexBox>
  );
}
