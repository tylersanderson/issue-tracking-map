import React, { useEffect, useState } from "react";
import BusyIndicatorComponent from "./components/busy-indicator/busy-indicator.component";
import BusyIndicatorContext from "./contexts/busy-indicator/busy-indicator.context";
import IssueListContext from "./contexts/issue-list/issue-list.context";
import CurrentUserContext from "./contexts/current-user/current-user.context";
import CurrentLocationContext from "./contexts/current-location/current-location.context";
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
import {
  auth,
  createUserProfileDocument,
  fetchIssues,
} from "./firebase/firebase.utils";

export function MyApp() {
  const [hideSideMenu, setHideSideMenu] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  //const [isLoading, setIsLoading] = useState(false);
  const [busyIndicatorVisible, setBusyIndicatorVisible] = useState(false);
  const [issueList, setIssueList] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});
  const [snapCurrentPosition, setSnapCurrentPosition] = useState(false);
  const setSelectedIssueContext = (issue) => setSelectedIssue(issue);

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
        setSnapCurrentPosition(false);
        setSnapCurrentPosition(true);
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

  const fetchIssueList = async () => {
    const openIssues = await fetchIssues();
    setIssueList(openIssues);
  };

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
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
    });
    fetchIssueList();
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {});

  return (
    <div>
      <CurrentLocationContext.Provider
        value={{ currentPosition, snapCurrentPosition }}
      >
        <CurrentUserContext.Provider value={{ currentUser }}>
          <IssueListContext.Provider value={{ issueList, fetchIssueList }}>
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
                    <Route
                      path="/home"
                      render={() => <HomePage issueListArray={issueList} />}
                    />
                    <Route
                      exact
                      path="/signin"
                      render={() =>
                        currentUser ? (
                          <Redirect to="/" />
                        ) : (
                          <SignInAndSignUpPage />
                        )
                      }
                    />
                    <Route
                      path="/report-issue"
                      render={() =>
                        !currentUser ? (
                          <Redirect to="/signin" />
                        ) : (
                          <ReportIssue issueListArray={issueList} />
                        )
                      }
                    />
                    <Route
                      path="/location"
                      component={BusyIndicatorComponent}
                    />
                    <Redirect from="/" to="/home" />
                  </Switch>
                </FlexBox>
              </FlexBox>
            </BusyIndicatorContext.Provider>
          </IssueListContext.Provider>
        </CurrentUserContext.Provider>
      </CurrentLocationContext.Provider>
    </div>
  );
}
