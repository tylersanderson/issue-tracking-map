import React, { useEffect, useState, useContext } from "react";
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
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { ButtonContainer } from "./comment-add.styles";

export default function CommentAdd() {
  const [newComment, setNewComment] = useState("");
  const [newCommentValueState, tesetNewCommentValueState] = useState("None");

  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   setEmail("");
    //   setPassword("");
    // } catch (error) {
    //   alert("Invalid email and password combination");
    //   console.log(error);
    // }
  };

  return (
    <FlexBox
      justifyContent={FlexBoxJustifyContent.Center}
      wrap={FlexBoxWrap.Wrap}
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
            <FormItem>
              <TextArea
                required={true}
                type="Text"
                maxlength="100"
                rows="3"
                placeholder="Add Comment"
                value={newComment}
                valueState={newCommentValueState}
                onInput={(e) => {
                  setNewComment(e.target.value);
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
