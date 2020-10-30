// We use this rupper navigator in order to use Redux...
// And because in startUpScreen we can not navigate to the authScreen.
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions, createAppContainer } from "react-navigation";

import ShopNavigator from "./shopNavigator";

const NavigationContainer = props => {
  // !! to force it to be true/false
  const isAuth = useSelector(state => !!state.auth.token);
  const navRef = useRef();
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);
  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;

const AppContainer = createAppContainer(ShopNavigator);
