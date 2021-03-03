import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/current-user/current-user.context";
import IssueListContext from "../../contexts/issue-list/issue-list.context";
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
import { createIssueDocument } from "../../firebase/firebase.utils";
import { useHistory } from "react-router-dom";
import { ButtonContainer } from "./issue-report-form.styles";

export default function IssueReportForm({ selectedLat, selectedLng }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { fetchIssueList } = useContext(IssueListContext);
  const [description, setDescription] = useState("");
  const [descriptionValueState, setDescriptionValueState] = useState("None");

  const today = new Date();

  const history = useHistory();

  useEffect(() => {
    fetchIssueList();
  }, []);

  const handleSubmit = async (event) => {
    if (!currentUser) return;

    description == null || description === ""
      ? setDescriptionValueState("Error")
      : setDescriptionValueState("None");

    try {
      await createIssueDocument(
        description,
        selectedLat,
        selectedLng,
        currentUser.displayName
      );
      fetchIssueList();
      history.push("/");
    } catch (error) {}

    // try {
    //   const { user } = await auth
    //     .createUserWithEmailAndPassword
    //     email,
    //     password
    //     ();

    //   await createUserProfileDocument(user, { displayName });
    // } catch (error) {
    //   console.error(error);
    // }
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
            <FormItem label="Reported By">
              <Input
                required={true}
                type="Text"
                readonly={true}
                //valueState={displayNameValueState}
                value={currentUser.displayName}
                // onInput={(e) => {
                //   setDisplayName(e.target.value);
                // }}
              />
            </FormItem>
            <FormItem label="Date">
              <Input
                required={true}
                type="Text"
                readonly={true}
                value={
                  today.getMonth() +
                  1 +
                  "/" +
                  today.getDate() +
                  "/" +
                  today.getFullYear()
                }
                //valueState={emailValueState}
                // onInput={(e) => {
                //   setEmail(e.target.value);
                // }}
              />
            </FormItem>
            <FormItem label="Description">
              <TextArea
                required={true}
                type="Text"
                maxlength="300"
                rows="10"
                value={description}
                valueState={descriptionValueState}
                onInput={(e) => {
                  setDescription(e.target.value);
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
