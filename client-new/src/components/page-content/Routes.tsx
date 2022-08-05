import React, { Component } from "react";

import { Switch } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import Home from "../home/Home";
import PrivateRoute from "../../PrivateRoute";
import Support from "../contact/Support";
import ScheduceManager from "../scheduce-manager/ScheduceManager";
import { Constants } from "../../common/utils/Constants";
import TicketManager from "../ticket-manager/TicketManager";
import BusManager from "../bus-manager/BusManager";
import ReportManager from "../report/ReportManager";

// import Fallback from "../Fallback";

class Routes extends Component<RouteComponentProps> {
  render() {
    return (
      <Switch>
        {/* <PrivateRoute
          path={"/home"}
          component={FarmMonitor}
        ></PrivateRoute> */}
        <PrivateRoute path={Constants.PATH_ROUTE.HOME} exact component={Home} />
        <PrivateRoute path={Constants.PATH_ROUTE.SCHEDUCE_MANAGER.PATH_NAME} exact component={ScheduceManager} />
        <PrivateRoute path={Constants.PATH_ROUTE.TICKET_MANAGER.PATH_NAME} exact component={TicketManager} />
        <PrivateRoute path={Constants.PATH_ROUTE.BUS_MANAGER.PATH_NAME} exact component={BusManager} />
        <PrivateRoute path={Constants.PATH_ROUTE.REPORT_MANAGER.PATH_NAME} exact component={ReportManager} />
        <PrivateRoute path={Constants.PATH_ROUTE.SUPPORT} exact component={Support} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
