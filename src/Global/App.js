import { Navigation } from "react-native-navigation";
/*                                                      */
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import Login from "../screens/Authentication/login";
import Signup from "../screens/Authentication/signup";
import Auth from "../screens/Auth";
import AddMessagesScreen from "../screens/AddMessagesScreen/AddMessagesScreen";
import NewLocation from "../screens/AddMessagesScreen/newLocation";
import LocationScreen from "../screens/LocationScreen/LocationScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import SideDrawer from "../screens/SideDrawer/SideDrawer";

//React native requires a wrapper to render components
//for each no screen, you must register the component
Navigation.registerComponent("spot.LoginScreen", () => Login);
Navigation.registerComponent("spot.SignupScreen", () => Signup);
Navigation.registerComponent("spot.AddMessagesScreen", () => AddMessagesScreen);
Navigation.registerComponent("spot.NewLocationScreen", () => NewLocation);
Navigation.registerComponent("spot.LocationScreen", () => LocationScreen);
Navigation.registerComponent("spot.ProfileScreen", () => ProfileScreen);
Navigation.registerComponent("spot.SettingsScreen", () => SettingsScreen);
Navigation.registerComponent("spot.Auth", () => Auth);
Navigation.registerComponent("spot.HomeScreen", () => HomeScreen);
Navigation.registerComponent("spot.SideDrawer", () => SideDrawer);

//Start the react Navigation wrapped App
Navigation.startSingleScreenApp({
  screen: {
    screen: "spot.Auth"
    // screen: "spot.LoginScreen",
    // title: "Spot!",
    // navigatorStyle: {
    //   navBarTextColor: "white",
    //   navBarTextFontSize: 45,
    //   navBarTitleTextCentered: true,
    //   navBarHeight: 150,
    //   navBarBackgroundColor: "#18458e"
    // }
  }
});
