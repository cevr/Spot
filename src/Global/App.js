import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
/*                  Relative imports                       */

import * as screens from "../screens/index";
import configureStore from "../redux/store";
//this initializes the global state
const Store = configureStore();

//React native requires a wrapper to render components
//for each no screen, you must register the component
Navigation.registerComponent("spot.Auth", () => screens.Auth, Store, Provider);
Navigation.registerComponent(
  "spot.LoginScreen",
  () => screens.Login,
  Store,
  Provider
);
Navigation.registerComponent(
  "spot.SignupScreen",
  () => screens.Signup,
  Store,
  Provider
);
Navigation.registerComponent(
  "spot.AddMessagesScreen",
  () => screens.AddMessagesScreen,
  Store,
  Provider
);
Navigation.registerComponent(
  "spot.AddLocationScreen",
  () => screens.AddLocationScreen,
  Store,
  Provider
);
Navigation.registerComponent(
  "spot.AllMessagesScreen",
  () => screens.AllMessagesScreen,
  Store,
  Provider
);
Navigation.registerComponent(
  "spot.CardPopUp",
  () => screens.CardPopUp,
  Store,
  Provider
);
Navigation.registerComponent(
  "spot.SettingsScreen",
  () => screens.SettingsScreen,
  Store,
  Provider
);
Navigation.registerComponent(
  "spot.HomeScreen",
  () => screens.HomeScreen,
  Store,
  Provider
);
Navigation.registerComponent("spot.Test", () => screens.Test, Store, Provider);

//Start the react Navigation wrapped App
Navigation.startSingleScreenApp({
  screen: {
    title: "Spot!",
    screen: "spot.LoginScreen",
    navigatorStyle: { navBarHidden: true }
  }
});
