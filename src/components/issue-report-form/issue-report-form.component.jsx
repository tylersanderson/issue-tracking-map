import React, { useEffect, useState } from "react";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Card,
  Button,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { Form } from "@ui5/webcomponents-react/lib/Form";
import { FormItem } from "@ui5/webcomponents-react/lib/FormItem";
import { Input } from "@ui5/webcomponents-react/lib/Input";
import { TextArea } from "@ui5/webcomponents-react/lib/TextArea";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import { ButtonContainer } from "./issue-report-form.styles";

export default function IssueReportForm() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [displayNameValueState, setDisplayNameValueState] = useState("None");
  const [emailValueState, setEmailValueState] = useState("None");
  const [passwordValueState, setPasswordValueState] = useState("None");
  const [confirmPasswordValueState, setConfirmPasswordValueState] = useState(
    "None"
  );

  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    displayName == null || displayName === ""
      ? setDisplayNameValueState("Error")
      : setDisplayNameValueState("None");

    password == null || password === "" || password.length < 6
      ? setPasswordValueState("Error")
      : setPasswordValueState("None");

    confirmPassword == null ||
    confirmPassword === "" ||
    confirmPassword.length < 6
      ? setConfirmPasswordValueState("Error")
      : setConfirmPasswordValueState("None");

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
    >
      <Card heading="Issue Description" style={spacing.sapUiContentPadding}>
        <FlexBox
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <Form labelSpanL="3" labelSpanM="3">
            <FormItem label="Description">
              <TextArea
                required={true}
                type="Text"
                maxlength="300"
                rows="10"
                valueState={displayNameValueState}
                onInput={(e) => {
                  setDisplayName(e.target.value);
                }}
              ></TextArea>
            </FormItem>
          </Form>
        </FlexBox>
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
        >
          <ButtonContainer>
            <Button onClick={handleSubmit}>Submit</Button>
          </ButtonContainer>
        </FlexBox>
      </Card>
    </FlexBox>
  );
}
