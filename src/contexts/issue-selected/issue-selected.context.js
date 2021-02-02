import { createContext } from "react";

const IssueSelectedContext = createContext({
  selectedIssue: undefined,
  setSelectedIssueContext: () => {},
});

export default IssueSelectedContext;
