import React from 'react';
import {BrowserRouter, Switch, Link, Route} from "react-router-dom";
import * as Paths from "./Utils/RoutingConstants" ;
import Home from "./HomeContainer/Home";
import Documents from "./DocumentsContainer/Documents";
import Editor from "./EditorContainer/Editor";
import { Menu } from "semantic-ui-react";

const style = {
  backgroundColor: "black",
  overflow: 'auto',
  textAlign: 'center',
  padding: 20,
}

function App() {
  return (
    <BrowserRouter>
        <div style={style}>
          <Link id="fonts" style={{float: "left", display: "inline-block", textDecoration: "none", paddingRight: 20, color: "white"}}><b>KAGHAZ</b></Link>
          <Link id="fonts" style={{float: "right", display: "inline-block", textDecoration: "none", paddingRight: 20, color: "white"}} to={Paths.Home}>Logout</Link>
          <Link id="fonts" style={{float: "right", display: "inline-block", textDecoration: "none", paddingRight: 20, color: "white"}} to={Paths.Documents}>Documents</Link>
        </div>
      <Switch>
        <Route path={Paths.Home} exact component={Home} />
        <Route path={Paths.Documents} exact component={Documents} />
        <Route path={Paths.Editor} exact component={Editor} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;