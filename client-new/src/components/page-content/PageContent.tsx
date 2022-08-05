import "./PageContent.scss";

import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withTranslation, WithTranslation } from "react-i18next";

import Routes from "./Routes";
import Header from "../header/Header";

/**
 * Page content class
 */
class PageContent extends Component<
  RouteComponentProps & WithTranslation
> {
  render() {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Header/>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ flexGrow: 1, overflow: "none" }}
              className={
                "page-content-container " +
                (false ? "edit-mode-right-panel" : "")
              }
            >
                <Routes />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  withTranslation()((PageContent))
);
