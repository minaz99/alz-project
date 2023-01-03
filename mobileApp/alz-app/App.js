import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTypes from "./screens/UserTypes";
import Login from "./screens/Login";
import Homepage from "./screens/Homepage";
import { Provider } from "react-redux";
import { store } from "./store";
import PatientsOrCaregivers from "./screens/PatientsOrCaregivers";
import Register from "./screens/Register";
import Outline from "./screens/newRegister screens/Outline";
import HomePageSocialworker from "./screens/HomePageSocialworker";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="UserTypes" component={UserTypes} />
          <Stack.Screen name="Login" component={Login} />
          {<Stack.Screen name="Home" component={Homepage} />}
          <Stack.Screen name="Caree" component={PatientsOrCaregivers} />
          <Stack.Screen name="Register" component={Outline} />
          <Stack.Screen
            name="HomeSocialworker"
            component={HomePageSocialworker}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
