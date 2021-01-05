import React from "react";
import { ShellBar, Avatar, Button } from "@ui5/webcomponents-react";
import { SideNavigation } from "@ui5/webcomponents-react/lib/SideNavigation";
import { SideNavigationItem } from "@ui5/webcomponents-react/lib/SideNavigationItem";
import { SideNavigationSubItem } from "@ui5/webcomponents-react/lib/SideNavigationSubItem";
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

  const handleMenuIconClick = (item) => {};

  return (
    <>
      <ShellBar
        startButton={
          <Button icon="menu" onClick={handleMenuIconClick}></Button>
        }
        profile={<Avatar image="ui5-logo.png" />}
        //primaryTitle={"UI5 Star Wars React App"}
      ></ShellBar>
      <SideNavigation
        className=""
        collapsed="true"
        fixedItems={
          <>
            <SideNavigationItem icon="chain-link" text="Useful Links" />
            <SideNavigationItem icon="history" text="History" />
          </>
        }
        onSelectionChange={function noRefCheck() {}}
        slot=""
        style={{}}
        tooltip=""
      >
        <SideNavigationItem icon="home" text="Home" />
        <SideNavigationItem expanded icon="group" text="People">
          <SideNavigationSubItem text="From My Team" />
          <SideNavigationSubItem text="From Other Teams" />
        </SideNavigationItem>
        <SideNavigationItem icon="locate-me" selected text="Locations" />
        <SideNavigationItem icon="calendar" text="Events">
          <SideNavigationSubItem text="Local" />
          <SideNavigationSubItem text="Others" />
        </SideNavigationItem>
      </SideNavigation>
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}
