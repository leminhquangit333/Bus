import React, { Component } from "react";

import { WithTranslation } from "react-i18next";
import { withRouter, RouteComponentProps } from "react-router";
import { Grid, Typography } from "@material-ui/core";

class ReportManager extends Component<RouteComponentProps & WithTranslation> {
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
export default withRouter(ReportManager);