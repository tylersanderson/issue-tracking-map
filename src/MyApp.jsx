import React, { useEffect, useState } from "react";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Card,
  ShellBar,
  Button,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { SideNavigation } from "@ui5/webcomponents-react/lib/SideNavigation";
import { SideNavigationItem } from "@ui5/webcomponents-react/lib/SideNavigationItem";
import { SideNavigationSubItem } from "@ui5/webcomponents-react/lib/SideNavigationSubItem";
//import "@ui5/webcomponents-icons/dist/icons/add.js";
import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { HomePage } from "./pages/homepage.component";
import { SignInAndSignUpPage } from "./pages/sign-in-and-sign-up.component";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import "@ui5/webcomponents-react/dist/Assets.js"; // Only if using the @ui5/webcomponents-react package
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

export function MyApp() {
  const [hideSideMenu, setHideSideMenu] = useState(true);
  const [currentUser, setCurrentUser] = useState("Tyler");

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
      console.log(currentUser);
      console.log(currentUser.displayName);
    });
  }, []);

  return (
    <div>
      <ShellBar
        startButton={
          <Button icon="menu" onClick={handleMenuIconClick}></Button>
        }
        logo={<img alt="logo" src="ui5-logo.png" />}
        onLogoClick={() => history.push("./home")}
        //profile={<Avatar image="ui5-logo.png" />}
        primaryTitle={"Issue Tracking Map"}
        secondaryTitle={currentUser}
        notificationCount={8}
        showNotifications
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
          <SideNavigationItem data-key="signin" icon="account" text="Sign In" />
          <SideNavigationItem expanded icon="group" text="People">
            <SideNavigationSubItem text="From My Team" />
            <SideNavigationSubItem text="From Other Teams" />
          </SideNavigationItem>
          <SideNavigationItem icon="locate-me" selected text="Locations" />
          <SideNavigationItem icon="calendar" text="Events">
            <SideNavigationSubItem text="Local" />
            <SideNavigationSubItem text="Others" />
          </SideNavigationItem>
          <SideNavigationItem data-key="signout" icon="log" text="Sign Out" />
        </SideNavigation>
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          fitContainer={true}
          //wrap={FlexBoxWrap.Wrap}
          //style={spacing.sapUiContentPadding}
        >
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/signin" component={SignInAndSignUpPage} />
            <Redirect from="/" to="/home" />
          </Switch>
        </FlexBox>
      </FlexBox>
    </div>
  );
}
