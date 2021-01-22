import React, { useEffect } from "react";
import SignIn from "../components/sign-in/sign-in.component";
import SignUp from "../components/sign-up/sign-up.component";

import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
} from "@ui5/webcomponents-react";

export function SignInAndSignUpPage() {
  useEffect(() => {}, []);

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
      //style={spacing.sapUiContentPadding}
    >
      <SignIn />
      <SignUp />
    </FlexBox>
  );
}
