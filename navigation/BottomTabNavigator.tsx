import {
  BottomTabBarProps,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon
} from "@ui-kitten/components";
import React from "react";
import FavoritesScreen from "screens/FavoritesScreen";
import HomeScreen from "screens/HomeScreen";
import NavigateScreen from "screens/NavigateScreen";
import ProfileScreen from "screens/ProfileScreen";

const { Navigator, Screen } = createBottomTabNavigator();

interface BottomNavigationTabWrapperProps {
  icons: {
    solid: string;
    outline: string;
  };
  currentTab: boolean;
}

const BottomNavigationTabWrapper = ({
  icons,
  currentTab,
  ...rest
}: BottomNavigationTabWrapperProps) => (
  <BottomNavigationTab
    icon={(props) => (
      <Icon name={currentTab ? icons.solid : icons.outline} {...props} />
    )}
    {...rest}
  />
);

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  return (
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{ backgroundColor: "none" }}
    >
      <BottomNavigationTabWrapper
        icons={{ solid: "home", outline: "home-outline" }}
        currentTab={state.index === 0}
      />
      <BottomNavigationTabWrapper
        icons={{ solid: "compass", outline: "compass-outline" }}
        currentTab={state.index === 1}
      />
      <BottomNavigationTabWrapper
        icons={{ solid: "star", outline: "star-outline" }}
        currentTab={state.index === 2}
      />
      <BottomNavigationTabWrapper
        icons={{ solid: "person", outline: "person-outline" }}
        currentTab={state.index === 3}
      />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="home" component={HomeScreen} />
    <Screen name="navigate" component={NavigateScreen} />
    <Screen name="favorites" component={FavoritesScreen} />
    <Screen name="profile" component={ProfileScreen} />
  </Navigator>
);

const AppNavigator = () => <TabNavigator />;

export default AppNavigator;
