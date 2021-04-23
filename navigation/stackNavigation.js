import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { APPBACKGROUNDCOLOR, APPTEXTWHITE } from "../style/constants";

import Login from "../screens/login";
import SignUp from "../screens//signup";

/* stackNavigation.js
 * stack navigator for not signed in user
 */

const HomeStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "",
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "",
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: APPBACKGROUNDCOLOR, height: 60 },
      headerTintColor: APPTEXTWHITE,
      headerTransparent: true,
    },
  }
);

const StackNavigator = createAppContainer(HomeStack);

export default StackNavigator;