import React, { useContext, createContext, useState, ReactNode } from "react";
import { Constants } from "../utils/Constants";
import { axiosInstance } from "./ajax-service";

/**
 * Example auth workflow: https://reactrouter.com/web/example/auth-workflow
 */
const AuthService = {
  isAuthenticated: false,
  signin(_userInfo: any, cb: any) {
    AuthService.isAuthenticated = true;
    cb();
  },
  signout(cb: any) {
    AuthService.isAuthenticated = false;
    cb();
  },
};

const authContext = createContext({
  user: getUser(),
  // tslint:disable-next-line:no-empty
  signin: (_userInfo: any, cb: any) => {},
  // tslint:disable-next-line:no-empty
  signout: (cb: any) => {},
});

/**
 * Get user info from localstorage
 *
 */
function getUser() {
  const _user = localStorage.getItem(Constants.LOCAL_STORAGE);

  return _user ? JSON.parse(_user) : undefined;
}

interface IProps {
  children: ReactNode;
  // any other props that come into the component
}

export function ProvideAuth({ children }: IProps) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const _user = getUser();
  const [user, setUser] = useState<any>(_user);

  const signin = (_userInfo: any, cb: any) => {
    return AuthService.signin(_userInfo, () => {
      localStorage.setItem(
        Constants.LOCAL_STORAGE,
        JSON.stringify(_userInfo)
      );

      setUser(getUser());
      cb();
    });
  };

  const signout = (cb: any) => {
    return AuthService.signout(() => {
      localStorage.removeItem(Constants.LOCAL_STORAGE);
      delete axiosInstance.defaults.headers[Constants.AUTHORIZATION_HEADER];
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

/**
 * Inject useAuth() for React class component
 *
 * @param _Component React component
 */
export function withReactHookAuth(AnyComponent: any) {
  return function WrappedComponent(props: any) {
    const auth = useAuth();
    return <AnyComponent {...props} auth={auth} />;
  };
}
