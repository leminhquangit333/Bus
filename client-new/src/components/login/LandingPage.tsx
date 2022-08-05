
import React, { Component } from "react";
import { withRouter, RouteComponentProps, Redirect } from "react-router";
import { withTranslation, WithTranslation } from "react-i18next";
import { withReactHookAuth } from "../../common/services/auth-service";
import { connect } from "react-redux";
import { Box, Grid } from "@material-ui/core";
import { Constants } from "../../common/utils/Constants";
import Header from "../header/Header";
import Home from "../home/Home";
import Login from "./Login";

interface LandingPageProps {
  auth: any;
}

class LandingPage extends Component<
  RouteComponentProps & WithTranslation & LandingPageProps
> {

  render() {
    const { auth } = this.props;

    return (
      <div>
        {!auth.user && <Login />}
        {auth.user && (
          <Redirect
            to={{
              pathname: "home",
              state: { from: this.props.location },
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

export default withReactHookAuth(
  withRouter(withTranslation()(connect(mapStateToProps)(LandingPage)))
);
