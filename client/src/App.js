import React from "react";
//for redux
import { Provider } from "react-redux"; //connects react with redux.
import store from "./Store/store";
//end redux
//for routing
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import * as Paths from "./Utils/RoutingConstants";
//end routing.
import Home from "./HomeContainer/Home";
import Documents from "./DocumentsContainer/Documents";
import Editor from "./EditorContainer/Editor";

const style = {
    backgroundColor: "black",
    overflow: "auto",
    textAlign: "center",
    padding: 20,
};

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div style={style}>
                    <Link
                        id="fonts"
                        style={{
                            float: "left",
                            display: "inline-block",
                            textDecoration: "none",
                            paddingRight: 20,
                            color: "white",
                        }}
                    >
                        <b>KAGHAZ</b>
                    </Link>
                    <Link
                        id="fonts"
                        style={{
                            float: "right",
                            display: "inline-block",
                            textDecoration: "none",
                            paddingRight: 20,
                            color: "white",
                        }}
                        to={Paths.Home}
                    >
                        Logout
                    </Link>
                    <Link
                        id="fonts"
                        style={{
                            float: "right",
                            display: "inline-block",
                            textDecoration: "none",
                            paddingRight: 20,
                            color: "white",
                        }}
                        to={Paths.Documents}
                    >
                        Documents
                    </Link>
                </div>
                <Switch>
                    <Route path={Paths.Home} exact component={Home} />
                    <Route path={Paths.Documents} exact component={Documents} />
                    <Route path={Paths.Editor} exact component={Editor} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
