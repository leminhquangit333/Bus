import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

class Home extends Component<WithTranslation> {
  render() {
    return (
      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
      >
        <Grid item xs>
          {" "}
          <Typography variant="subtitle2" style={{ fontSize: 40 ,color: "red"}}>
            Tính năng chưa được cập nhật!!!
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => ({});

export default withTranslation()(Home);
