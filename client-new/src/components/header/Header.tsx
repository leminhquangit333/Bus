/* eslint-disable jsx-a11y/alt-text */
import "./Header.scss";

import { useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter, RouteComponentProps } from "react-router";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

// import store from '../../../store/store';
// import { Action } from '../../../actions/ActionType';
import { useHistory } from "react-router";
import { useAuth } from "../../common/services/auth-service";
import { updateAxiosInstance } from "../../common/services/ajax-service";
import { Grid } from "@material-ui/core";
import SideMenu from "../side-menu/SideMenu";

import admin from "../../assets/images/icon/admin.png";

function Header(props: any) {
  const history = useHistory();

  const auth = useAuth();

  const userLogin = auth?.user;

  // TODO:: update later for label2
  const userInfo = { label1: userLogin?.name, label2: "Admin" };

  updateAxiosInstance(
    {
      accessToken: userLogin?.access_token,
      userName: userLogin?.name,
    },
    auth,
    history
  );

  function logOut() {
    auth.signout(() => {
      window.location.reload();
    });
  }

  return (
    <Grid container className="header full-width" direction="row">
      {auth?.user && (
        <Grid item xs={3}>
          <SideMenu />
        </Grid>
      )}
      <Grid item container xs={6} justifyContent="center">
        <div className="box">
          <div className="inner">
            <span>Dịch Vụ Quản Lý Nhà Xe Toàn Thông</span>
          </div>
          <div className="inner">
            <span>Dịch Vụ Quản Lý Nhà Xe Toàn Thông</span>
          </div>
        </div>
      </Grid>
      {auth?.user && (
        <Grid
          item
          xs={3}
          container
          justifyContent="center"
          alignContent="center"
          direction="row"
        >
          <Grid item>
            {" "}
            <div className="user" onClick={logOut}>
              <img src={admin} width="50" height="50" />
            </div>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignContent="center"
            direction="row"
          >
            {" "}
            <div>{`Xin Chào, ${userInfo.label1}`}</div>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({});

export default withRouter(Header);
