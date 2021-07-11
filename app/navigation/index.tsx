import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import MovieInfoScreen from "screens/MovieInfoScreen";
import NotFoundScreen from "screens/NotFoundScreen";
import { RootStackParamList } from "shared/interfaces/navigation.interfaces";
import { DEFAULT_COLOR } from "styles/variables";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation() {
  const theme = DefaultTheme;

  theme.colors.background = DEFAULT_COLOR;

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="MovieInfo" component={MovieInfoScreen} />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
