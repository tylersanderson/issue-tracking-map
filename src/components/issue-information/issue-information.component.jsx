import React, { useEffect, useState, useContext } from "react";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Card,
  Button,
} from "@ui5/webcomponents-react";
import { NotificationListItem } from "@ui5/webcomponents-react/lib/NotificationListItem";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValueState, setEmailValueState] = useState("None");
  const [passwordValueState, setPasswordValueState] = useState("None");

  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Invalid email and password combination");
      console.log(error);
    }
  };

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
    >
      <NotificationListItem
        avatar={
          <Avatar
            image="https://sap.github.io/ui5-webcomponents/assets/images/avatars/woman_avatar_1.png"
            size="XS"
          />
        }
        className=""
        footnotes={
          <>
            <Label>{selectedIssue}</Label>
            <Label>2 Days</Label>
          </>
        }
        heading="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
        onClose={function noRefCheck() {}}
        slot=""
        style={{
          width: "600px",
        }}
        tooltip=""
      >
        And with a very long description and long labels of the action buttons -
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor,
        nec elementum lectus turpis at nunc.
      </NotificationListItem>
    </FlexBox>
  );
}
