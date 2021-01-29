import React, { useContext, useEffect, useState } from "react";
import BusyIndicatorComponent from "./components/busy-indicator/busy-indicator.component";
import BusyIndicatorContext from "./contexts/busy-indicator/busy-indicator.context";
import {
  FlexBox,
  FlexBoxJustifyContent,
  ShellBar,
  Button,
} from "@ui5/webcomponents-react";
import { SideNavigation } from "@ui5/webcomponents-react/lib/SideNavigation";
import { SideNavigationItem } from "@ui5/webcomponents-react/lib/SideNavigationItem";
import { SideNavigationSubItem } from "@ui5/webcomponents-react/lib/SideNavigationSubItem";
//import "@ui5/webcomponents-icons/dist/icons/add.js";
import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { HomePage } from "./pages/homepage.component";
import { ReportIssue } from "./pages/report-issue.component";
import { SignInAndSignUpPage } from "./pages/sign-in-and-sign-up.component";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import "@ui5/webcomponents-react/dist/Assets.js"; // Only if using the @ui5/webcomponents-react package
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

export function MyApp() {
  const [hideSideMenu, setHideSideMenu] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  //const [isLoading, setIsLoading] = useState(false);
  const [busyIndicatorVisible, setBusyIndicatorVisible] = useState(false);

  const history = useHistory();

  const handleMenuIconClick = () => {
    setHideSideMenu(!hideSideMenu);
  };

  const handleMenuItemClick = (item) => {
    switch (item.detail.item.dataset.key) {
      case "home":
        history.push("./home");
        break;
      case "signin":
        history.push("./signin");
        break;
      case "signout":
        auth.signOut();
        break;
      case "location":
        history.push("./location");
        break;
      case "issues":
        history.push("./home");
        break;
      case "view-all-issues":
        history.push("./home");
        break;
      case "report-new-issue":
        history.push("./report-issue");
        break;
      default:
        history.push("./home");
    }
  };

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
      console.log(userAuth);
      console.log(currentUser);
    });
  }, []);

  useEffect(() => {
    //busyIndicatorShow();
    //busyIndicatorHide();
  });

  return (
    <div>
      <BusyIndicatorContext.Provider value={{ busyIndicatorVisible }}>
        <ShellBar
          startButton={
            <Button icon="menu" onClick={handleMenuIconClick}></Button>
          }
          logo={<img alt="logo" src="ui5-logo.png" />}
          onLogoClick={() => history.push("./home")}
          //profile={<Avatar image="ui5-logo.png" />}
          primaryTitle={"Issue Tracking Map"}
          secondaryTitle={currentUser ? currentUser.displayName : ""}
          notificationCount={8}
          showNotifications
          onNotificationsClick={() => {
            setBusyIndicatorVisible(!busyIndicatorVisible);
            console.log(busyIndicatorVisible);
          }}
        ></ShellBar>
        <FlexBox
        //justifyContent={FlexBoxJustifyContent.Left}
        //wrap={FlexBoxWrap.Wrap}
        //style={spacing.sapUiContentPadding}
        >
          <SideNavigation
            className=""
            collapsed={hideSideMenu}
            // fixedItems={
            //   <>
            //     <SideNavigationItem icon="chain-link" text="Useful Links" />
            //     <SideNavigationItem icon="history" text="History" />
            //   </>
            // }
            onSelectionChange={handleMenuItemClick}
            // slot=""
            // style={{}}
            // tooltip=""
          >
            <SideNavigationItem data-key="home" icon="home" text="Home" />
            {currentUser ? null : (
              <SideNavigationItem
                data-key="signin"
                icon="account"
                text="Sign In"
              />
            )}
            <SideNavigationItem
              expanded
              data-key="issues"
              icon="map"
              text="Issues"
            >
              <SideNavigationSubItem
                data-key="view-all-issues"
                text="View All Issues"
              />
              <SideNavigationSubItem
                data-key="report-new-issue"
                text="Report New Issue"
              />
            </SideNavigationItem>
            <SideNavigationItem
              data-key="location"
              icon="locate-me"
              selected
              text="Locations"
            />
            {currentUser ? (
              <SideNavigationItem
                data-key="signout"
                icon="log"
                text="Sign Out"
              />
            ) : null}
          </SideNavigation>
          {busyIndicatorVisible ? <BusyIndicatorComponent /> : null}
          <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            fitContainer={true}
            //wrap={FlexBoxWrap.Wrap}
            //style={spacing.sapUiContentPadding}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/signin"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
                }
              />
              <Route path="/report-issue" component={ReportIssue} />
              <Route path="/location" component={BusyIndicatorComponent} />
              <Redirect from="/" to="/home" />
            </Switch>
          </FlexBox>
        </FlexBox>
      </BusyIndicatorContext.Provider>
    </div>
  );
}
