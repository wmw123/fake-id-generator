import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import PhotoEditor from "./pages/PhotoEditor";
import PassportEditor from "./pages/PassportEditor";

import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/passporteditor" component={PassportEditor} />
      <Route exact path="/photoeditor" component={PhotoEditor} />
    </Switch>
  );
}

export default App;
