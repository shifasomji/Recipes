import { createSwitchNavigator, createAppContainer } from "react-navigation";
import StackNavigator from "./stackNavigation";
import Navigator from "./navigation";

/* switchNavigation.js
 * Switch navigation - controlls navigation after user logs in/signs out
 *
 */

const SwitchNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: StackNavigator,
      App: Navigator,
    },
    {
      initialRouteName: "Auth",
    }
  )
);

export default SwitchNavigator;