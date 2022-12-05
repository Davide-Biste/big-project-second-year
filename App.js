import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./src/screens/onBoarding/login/Login";
import { persistor, store } from "./src/state";
import { PersistGate } from "redux-persist/integration/react";
import { userSelectors } from "./src/state/user";
import { Home } from "./src/screens/home/Home";
import { Location } from "./src/screens/location/Location";
import "./src/api/axios";
import { CharacterDetail } from "./src/screens/character/CharacterDetail";
import "./src/i18n/index";

export default function App() {
  const Stack = createNativeStackNavigator();

  const Navigation = () => {
    const userToken = useSelector(userSelectors.token);
    return (
      <NavigationContainer>
        {userToken ? <LoggedStack /> : <UnLoggedStack />}
      </NavigationContainer>
    );
  };

  const UnLoggedStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Login"} component={Login} />
      </Stack.Navigator>
    );
  };

  const LoggedStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Home} />
        <Stack.Screen name={"Detail"} component={CharacterDetail} />
        <Stack.Screen name={"Location"} component={Location} />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
