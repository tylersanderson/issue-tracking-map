import React, { useEffect, useState, useContext, useRef } from "react";
import CurrentUserContext from "../../contexts/current-user/current-user.context";
import IssueListContext from "../../contexts/issue-list/issue-list.context";
import {
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Button,
} from "@ui5/webcomponents-react";
import { NotificationListGroupItem } from "@ui5/webcomponents-react/lib/NotificationListGroupItem";
import { NotificationListItem } from "@ui5/webcomponents-react/lib/NotificationListItem";
import { NotificationAction } from "@ui5/webcomponents-react/lib/NotificationAction";
import { TextArea } from "@ui5/webcomponents-react/lib/TextArea";
import { Dialog } from "@ui5/webcomponents-react/lib/Dialog";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import "@ui5/webcomponents-react/dist/Assets.js"; // Only if using the @ui5/webcomponents-react package
import { ButtonContainer } from "./issue-information.styles";
import { createCommentDocument } from "../../firebase/firebase.utils";
import { useHistory } from "react-router-dom";

export default function IssueInformation({
  issueArray,
  setSnapIssuePosition,
  setSelectedIssueLat,
  setSelectedIssueLng,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { fetchIssueList } = useContext(IssueListContext);
  const [newComment, setNewComment] = useState("");
  const [newCommentValueState, setNewCommentValueState] = useState("None");
  const [issueForComment, setIssueForComment] = useState("");

  useEffect(() => {}, []);

  const dialogRef = useRef();

  const history = useHistory();

  const handleDialogOpen = (issue) => {
    if (!currentUser) {
      history.push("/signin");
    } else {
      setIssueForComment(issue);
      dialogRef.current.open();
    }
  };

  const handleCommentAdd = async (issue) => {
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

  const handleIssueMapFocus = (issueLat, issueLng) => {
    setSelectedIssueLat(issueLat);
    setSelectedIssueLng(issueLng);
    setSnapIssuePosition(true);
    setSnapIssuePosition(false);
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
                heading={"Issue " + (i + 1)}
                priority="Medium"
                actions={
                  <>
                    <Button
                      icon="map"
                      onClick={() =>
                        handleIssueMapFocus(
                          issueArray[i].location.latitude,
                          issueArray[i].location.longitude
                        )
                      }
                    >
                      Add Comment
                    </Button>
                  </>
                }
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
