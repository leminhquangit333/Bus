import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";

import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";

import { Provider } from "react-redux";

import store, { AppState } from "./store/store";
import { Constants } from "./common/utils/Constants";
import { ProvideAuth, useAuth } from "./common/services/auth-service";
import Login from "./components/login/Login";
import { Grid } from "@material-ui/core";
import PageContent from "./components/page-content/PageContent";
import LandingPage from "./components/login/LandingPage";
import "./app.scss";

class App extends Component<WithTranslation, AppState> {
  render() {
    const _user = localStorage.getItem(Constants.LOCAL_STORAGE);
    document.title = "Nhà Xe Toàn Thông";
    return (
      <Grid className={_user ? "" : "page"}>
        <Provider store={store}>
          <ProvideAuth>
            <Router>
              <Switch>
                <Route
                  path={Constants.PATH_ROUTE.LANDING_PAGE}
                  exact
                  component={LandingPage}
                />
                <Route
                  path={Constants.PATH_ROUTE.LOGIN}
                  exact
                  component={Login}
                />
                               {!_user && <Redirect to='/'/>}
                <PageContent />
              </Switch>
            </Router>
          </ProvideAuth>
        </Provider>
      </Grid>
    );
  }
}

export default withTranslation()(App);
