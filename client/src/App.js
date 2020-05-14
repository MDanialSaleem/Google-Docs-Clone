import React, { useEffect } from "react";
//for redux
import { Provider } from "react-redux"; //connects react with redux.
import store from "./Store/store";
//end redux
//for routing
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as Paths from "./Utils/RoutingConstants";
import PrivateRoute from "./SharedComponents/PrivateRoute";
//end routing.
//for auth
import { loadUser } from "./Store/Actions/Auth";
//end auth
import Home from "./HomeContainer/Home";
import Documents from "./DocumentsContainer/Documents";
import Editor from "./EditorContainer/Editor";
import Navbar from "./SharedComponents/Navbar";
function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path={Paths.Home} exact component={Home} />
                    <PrivateRoute>
                        <Route
                            path={Paths.Documents}
                            exact
                            component={Documents}
                        />
                    </PrivateRoute>
                    <PrivateRoute>
                        <Route path={Paths.Editor} exact component={Editor} />
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
