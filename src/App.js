import React from 'react';
import {BrowserRouter, Switch, Link, Route} from "react-router-dom";
import * as Paths from "./Utils/RoutingConstants" ;
import Home from "./HomeContainer/Home";
import Documents from "./DocumentsContainer/Documents";
import Editor from "./EditorContainer/Editor";

function App() {
  return (
    <BrowserRouter>
        <div>
          {/* temporary navbar */}
          <Link to={Paths.Home}>Home</Link>
          <Link to={Paths.Documents}>Documents</Link>
          <Link to={Paths.Editor}>Editor</Link>
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
