import React from "react";
import IssueSelectedContext from "../../contexts/issue-selected/issue-selected.context";

export function mapHOC(Component) {
  <IssueSelectedContext.Consumer>
    {(value) => <Component {...value} />}
  </IssueSelectedContext.Consumer>;
}

//export default MapHOC;
