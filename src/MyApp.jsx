import React from "react";
import { ShellBar, Avatar } from "@ui5/webcomponents-react";
//import "@ui5/webcomponents-icons/dist/icons/add.js";
import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Home } from "./pages/home.component";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import "@ui5/webcomponents-react/dist/Assets.js"; // Only if using the @ui5/webcomponents-react package

export function MyApp() {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push("./home");
  };

  const handleMenuItemClick = (item) => {
    switch (item.detail.item.dataset.key) {
      case "Home":
        history.push("./home");
        break;
    }
  };

  return (
    <>
      <ShellBar
        logo={<img alt="logo" src="react-logo.png" />}
        profile={<Avatar image="ui5-logo.png" />}
        primaryTitle={"UI5 Star Wars React App"}
        onLogoClick={handleLogoClick}
        onMenuItemClick={handleMenuItemClick}
        menuItems={<div></div>}
      ></ShellBar>
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}
