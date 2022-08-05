import React from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  Route,
  Redirect,
  withRouter,
  useLocation,
  useHistory,
} from "react-router-dom";

import { useAuth } from "./common/services/auth-service";
import { Constants } from "./common/utils/Constants";
import { AppState } from "./store/store";

function PrivateRoute({ path, component: Component }: any): JSX.Element {
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      {auth.user && (
        <Route
          path={path}
          render={(props: any) => {
            // override patching to prevent pushing same url into history stack
            const prevHistoryPush = history.push;
            history.push = (pathname: any) => {
                // Move to next route if there is no change.
                prevHistoryPush(pathname);
            };
            return <Component {...props} />;
          }}
        />
      )}
      {!auth.user && (
        <Redirect
          to={{
            pathname: Constants.PATH_ROUTE.LANDING_PAGE,
            state: { from: location },
          }}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
});

export default withTranslation()(
  connect(mapStateToProps)(withRouter(PrivateRoute))
);
