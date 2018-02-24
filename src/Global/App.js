import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
/*                  Relative imports                       */

import * as screens from "../screens/index";
import configureStore from "../redux/store";
//this initializes the global state
const Store = configureStore();

//React native requires a wrapper to render components
//for each no screen, you must register the component
Navigation.registerComponent("spot.Auth", () => screens.Auth);
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
  "spot.LocationScreen",
  () => screens.LocationScreen,
  Store,
  Provider
);
Navigation.registerComponent(
  "spot.ProfileScreen",
  () => screens.ProfileScreen,
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
Navigation.registerComponent("spot.SideDrawer", () => screens.SideDrawer);
Navigation.registerComponent("spot.Test", () => screens.Test, Store, Provider);

//Start the react Navigation wrapped App
Navigation.startSingleScreenApp({
  screen: {
    screen: "spot.LoginScreen",
    title: "Spot!"
  }
});
