import React from "react";

import { BusyIndicator } from "@ui5/webcomponents-react/lib/BusyIndicator";
import { BusyIndicatorContainer } from "./busy-indicator.styles";

export default function BusyIndicatorComponent() {
  return (
    <BusyIndicatorContainer>
      <BusyIndicator active={true} className="" slot="" style={{}} tooltip="" />
    </BusyIndicatorContainer>
  );
}
