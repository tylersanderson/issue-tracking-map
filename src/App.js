import "@ui5/webcomponents/dist/Assets.js";
import { ThemeProvider } from "@ui5/webcomponents-react/lib/ThemeProvider";
import React from "react";
import "./App.css";
import { MyApp } from "./MyApp";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <MyApp />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
