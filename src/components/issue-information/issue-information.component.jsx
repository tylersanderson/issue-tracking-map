import React, { useEffect, useState, useContext, useRef } from "react";
import CurrentUserContext from "../../contexts/current-user/current-user.context";
import IssueListContext from "../../contexts/issue-list/issue-list.context";
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
import { TextArea } from "@ui5/webcomponents-react/lib/TextArea";
import { Dialog } from "@ui5/webcomponents-react/lib/Dialog";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import { ButtonContainer } from "./issue-information.styles";
import { createCommentDocument } from "../../firebase/firebase.utils";

export default function IssueInformation({ issueArray }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { fetchIssueList } = useContext(IssueListContext);
  const [newComment, setNewComment] = useState("");
  const [newCommentValueState, setNewCommentValueState] = useState("None");
  const [issueForComment, setIssueForComment] = useState("");

  useEffect(() => {
    console.log("issue info component");
  }, []);

  const dialogRef = useRef();

  const handleDialogOpen = (issue) => {
    setIssueForComment(issue);
    dialogRef.current.open();
  };

  const handleCommentAdd = async (issue) => {
    console.log(issueForComment);
    if (!currentUser) return;
    //.current.open();
    newComment == null || newComment === ""
      ? setNewCommentValueState("Error")
      : setNewCommentValueState("None");
    try {
      await createCommentDocument(
        issueForComment,
        newComment,
        currentUser.displayName
      );
      fetchIssueList();
      dialogRef.current.close();
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

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
        showClose={false}
        showCounter
        slot=""
        style={{}}
        tooltip=""
      >
        {issueArray
          .sort(function (a, b) {
            return a.createdAt - b.createdAt;
          })
          .map((issues, i) => {
            return (
              <NotificationListItem
                key={i}
                // footnotes={
                //   <div>{issueArray[i].createdAt.toDate().toDateString()}</div>
                // }
                heading={i}
                priority="Medium"
              >
                {issueArray[i].description}
                <br></br>
                <br></br>
                {issueArray[i].createdAt.toDate().toDateString()}
                {" created by "}
                {issueArray[i].createdBy}
                <NotificationListGroupItem
                  // actions={
                  //   <div>
                  //     <NotificationAction icon="accept" text="Accept all" />
                  //     <NotificationAction icon="message-error" text="Reject all" />
                  //   </div>
                  // }
                  className=""
                  heading="Comments"
                  showClose={false}
                  showCounter
                  slot=""
                  style={{}}
                  tooltip=""
                  collapsed={true}
                >
                  {issueArray[i].comments[0]
                    ? issueArray[i].comments
                        .sort(function (a, b) {
                          return a.createdAt - b.createdAt;
                        })
                        .map((comments, j) => {
                          return (
                            <NotificationListItem
                              key={j}
                              footnotes={
                                <div>
                                  {issueArray[i].comments[j].createdAt
                                    .toDate()
                                    .toLocaleDateString()}{" "}
                                  {issueArray[i].comments[j].createdAt
                                    .toDate()
                                    .toLocaleTimeString()}
                                </div>
                              }
                              heading={issueArray[i].comments[j].createdBy}
                              //priority="Medium"
                            >
                              {issueArray[i].comments[j].comment}
                            </NotificationListItem>
                          );
                        })
                    : null}
                </NotificationListGroupItem>
                <ButtonContainer>
                  <Button onClick={() => handleDialogOpen(issueArray[i].id)}>
                    Add Comment
                  </Button>
                </ButtonContainer>
              </NotificationListItem>
            );
          })}
      </NotificationListGroupItem>
      <div>
        <Dialog
          ref={dialogRef}
          footer={
            <FlexBox
              justifyContent={FlexBoxJustifyContent.Center}
              wrap={FlexBoxWrap.Wrap}
            >
              <ButtonContainer>
                <Button onClick={() => handleCommentAdd()}>Submit</Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button onClick={() => dialogRef.current.close()}>
                  Cancel
                </Button>
              </ButtonContainer>
            </FlexBox>
          }
          headerText="Add Comment"
        >
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
        </Dialog>
      </div>
    </FlexBox>
  );
}
