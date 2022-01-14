import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from "../screens/home";
import Auth from "../screens/auth";

const screens = {
  Auth: {
    screen: Auth, // first object is default screen
  },
  Home: {
    screen: Home,
  },
};
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
