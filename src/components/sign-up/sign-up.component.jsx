import React, { useEffect } from "react";
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
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { ButtonContainer } from "./sign-up.styles";

export default function SignIn() {
  useEffect(() => {}, []);

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
      //style={spacing.sapUiContentPadding}
    >
      <Card
        heading="I do not have an account"
        style={spacing.sapUiContentPadding}
      >
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <Form>
            <FormItem label="Display Name">
              <Input
                required={true}
                type="Text"
                //valueState={garageAreaSqFtValueState}
                //onInput={(e) => {
                //  setGarageAreaSqFt(e.target.value);
                //}}
                //onSubmit={handleSubmit}
              />
            </FormItem>
            <FormItem label="Email">
              <Input
                required={true}
                type="Email"
                //valueState={garageAreaSqFtValueState}
                //onInput={(e) => {
                //  setGarageAreaSqFt(e.target.value);
                //}}
                //onSubmit={handleSubmit}
              />
            </FormItem>
            <FormItem label="Password">
              <Input
                required={true}
                type="Password"
                //valueState={garageAreaSqFtValueState}
                //onInput={(e) => {
                //  setGarageAreaSqFt(e.target.value);
                //}}
                //onSubmit={handleSubmit}
              />
            </FormItem>
            <FormItem label="Confirm Password">
              <Input
                required={true}
                type="Password"
                //valueState={garageAreaSqFtValueState}
                //onInput={(e) => {
                //  setGarageAreaSqFt(e.target.value);
                //}}
                //onSubmit={handleSubmit}
              />
            </FormItem>
          </Form>
        </FlexBox>
      </Card>
    </FlexBox>
  );
}
