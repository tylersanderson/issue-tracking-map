import React, { useEffect } from "react";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Card,
  Title,
  Button,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { Form } from "@ui5/webcomponents-react/lib/Form";
import { FormItem } from "@ui5/webcomponents-react/lib/FormItem";
import { Input } from "@ui5/webcomponents-react/lib/Input";
import "@ui5/webcomponents/dist/Assets.js";
import { ProductSwitch } from "@ui5/webcomponents-react/lib/ProductSwitch";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import { auth, signInWithGoogle } from "../firebase/firebase.utils";

export function SignInAndSignUpPage() {
  useEffect(() => {}, []);

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
      //style={spacing.sapUiContentPadding}
    >
      <Card
        heading="I already have an account"
        style={spacing.sapUiContentPadding}
      >
        <FlexBox
          justifyContent={FlexBoxJustifyContent.SpaceAround}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <Form>
            <FormItem label="Email">
              <Input
                required={true}
                type="Email"
                // valueState={garageAreaSqFtValueState}
                // onInput={(e) => {
                //   setGarageAreaSqFt(e.target.value);
                //}}
                //onSubmit={handleSubmit}
              />
            </FormItem>
            <FormItem label="Password">
              <Input
                required={true}
                type="Password"
                // valueState={garageAreaSqFtValueState}
                // onInput={(e) => {
                //   setGarageAreaSqFt(e.target.value)}};
                //onSubmit={handleSubmit}
              />
            </FormItem>
          </Form>
        </FlexBox>
        <FlexBox
          justifyContent={FlexBoxJustifyContent.SpaceAround}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
          fitContainer={false}
        >
          <Button
            //design="Emphasized"
            //icon="arrow-left"
            onClick={signInWithGoogle}
            //disabled={peopleList.previous == null ? true : false}
          >
            Sign In
          </Button>

          <Button
            design="Emphasized"
            //icon="arrow-left"
            onClick={signInWithGoogle}
            //disabled={peopleList.previous == null ? true : false}
          >
            Sign In With Google
          </Button>
        </FlexBox>
      </Card>
      <Card
        heading="I do not have an account"
        style={spacing.sapUiContentPadding}
      ></Card>
    </FlexBox>
  );
}
