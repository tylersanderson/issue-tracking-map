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
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import { ButtonContainer } from "./sign-up.styles";

export default function SignUp() {
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

  const validateEmail = (emailField) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) === false) {
      setEmailValueState("Error");
      alert("Invalid Email Address");
    } else {
      setEmailValueState("None");
    }
  };

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

    validateEmail(email);
    console.log(emailValueState);

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
      style={{ maxWidth: "300px" }}
    >
      <Card
        heading="I do not have an account"
        style={spacing.sapUiContentPadding}
      >
        <FlexBox
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <Form labelSpanL="3" labelSpanM="3">
            <FormItem label="Display Name">
              <Input
                required={true}
                type="Text"
                valueState={displayNameValueState}
                onInput={(e) => {
                  setDisplayName(e.target.value);
                }}
              />
            </FormItem>
            <FormItem label="Email">
              <Input
                required={true}
                type="Email"
                valueState={emailValueState}
                onInput={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormItem>
            <FormItem label="Password">
              <Input
                required={true}
                type="Password"
                valueState={passwordValueState}
                onInput={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormItem>
            <FormItem label="Confirm Password">
              <Input
                required={true}
                type="Password"
                valueState={confirmPasswordValueState}
                onInput={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </FormItem>
          </Form>
        </FlexBox>
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
        >
          <ButtonContainer>
            <Button onClick={handleSubmit}>Sign Up</Button>
          </ButtonContainer>
        </FlexBox>
      </Card>
    </FlexBox>
  );
}
