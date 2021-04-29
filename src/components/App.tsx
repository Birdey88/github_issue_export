import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./main_app/Dashboard";
import store from "../store/store";
import Repos from "./main_app/repos/Repos";
import Export from "./main_app/export/Export";
import Issues from "./main_app/Issues/Issues";
import Auth from "./main_app/Authorization/Auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Auth} />
          <Route exact path="/Auth" component={Dashboard} />
          <PrivateRoute exact path="/Repos" component={Repos} />
          <PrivateRoute exact path="/Issues/:id/:repoName" component={Issues} />
          <PrivateRoute exact path="/Export/:id/:repoName" component={Export} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
