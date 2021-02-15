import React, { useEffect, useState, useContext } from "react";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Card,
  Button,
} from "@ui5/webcomponents-react";
import { NotificationListGroupItem } from "@ui5/webcomponents-react/lib/NotificationListGroupItem";
import { NotificationListItem } from "@ui5/webcomponents-react/lib/NotificationListItem";
import { NotificationAction } from "@ui5/webcomponents-react/lib/NotificationAction";
import { Avatar } from "@ui5/webcomponents-react/lib/Avatar";
import { Label } from "@ui5/webcomponents-react/lib/Label";
import { spacing } from "@ui5/webcomponents-react-base";
import { Form } from "@ui5/webcomponents-react/lib/Form";
import { FormItem } from "@ui5/webcomponents-react/lib/FormItem";
import { Input } from "@ui5/webcomponents-react/lib/Input";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { ButtonContainer } from "./issue-information.styles";

export default function IssueInformation({ issueArray, selectedIssue }) {
  useEffect(() => {}, []);

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
    >
      <NotificationListGroupItem
        // actions={
        //   <div>
        //     <NotificationAction icon="accept" text="Accept all" />
        //     <NotificationAction icon="message-error" text="Reject all" />
        //   </div>
        // }
        className=""
        heading="Issue List"
        //onClose={function noRefCheck() {}}
        onToggle={function noRefCheck() {}}
        showClose={false}
        showCounter
        slot=""
        style={{}}
        tooltip=""
      >
        {issueArray.map((issues, i) => {
          return (
            <NotificationListItem
              key={i}
              // actions={
              //   <div>
              //     <NotificationAction icon="accept" text="Accept" />
              //     <NotificationAction icon="message-error" text="Reject" />
              //   </div>
              // }
              // avatar={
              //   <Avatar
              //     image="https://sap.github.io/ui5-webcomponents/assets/images/avatars/woman_avatar_1.png"
              //     size="XS"
              //   />
              // }
              footnotes={<div></div>}
              heading={i}
              priority="Medium"
            >
              {issueArray[i].Description}
            </NotificationListItem>
          );
        })}
      </NotificationListGroupItem>
    </FlexBox>
  );
}
