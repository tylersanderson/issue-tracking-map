import React, { useEffect, useState, useContext } from "react";
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
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import { ButtonContainer } from "./issue-information.styles";

export default function IssueInformation({ issueArray }) {
  useEffect(() => {
    console.log("issue info component");
  }, []);

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
        {issueArray.map((issues, i) => {
          return (
            <NotificationListItem
              key={i}
              footnotes={
                <div>{issueArray[i].createdAt.toDate().toDateString()}</div>
              }
              heading={i}
              priority="Medium"
            >
              {issueArray[i].description}

              <NotificationListGroupItem
                // actions={
                //   <div>
                //     <NotificationAction icon="accept" text="Accept all" />
                //     <NotificationAction icon="message-error" text="Reject all" />
                //   </div>
                // }
                className=""
                heading="Comments"
                showClose={true}
                showCounter
                slot=""
                style={{}}
                tooltip=""
              >
                {issueArray[i].comments[0]
                  ? issueArray[i].comments.map((comments, j) => {
                      return (
                        <NotificationListItem
                          key={i}
                          footnotes={
                            <div>
                              {issueArray[i].comments[j].createdAt
                                .toDate()
                                .toDateString()}{" "}
                              by {issueArray[i].comments[j].createdBy}
                            </div>
                          }
                          //heading={i}
                          //priority="Medium"
                        >
                          {issueArray[i].comments[j].comment}
                        </NotificationListItem>
                      );
                    })
                  : null}
              </NotificationListGroupItem>
            </NotificationListItem>
          );
        })}
      </NotificationListGroupItem>
    </FlexBox>
  );
}
