import {
  BottomTabBarProps,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  BottomNavigationTabProps,
  Icon
} from "@ui-kitten/components";
import React from "react";
import FavoritesScreen from "screens/FavoritesScreen";
import HomeScreen from "screens/HomeScreen";
import NavigateScreen from "screens/NavigateScreen";
import ProfileScreen from "screens/ProfileScreen";

const { Navigator, Screen } = createBottomTabNavigator();

interface BottomNavigationTabWrapperProps extends BottomNavigationTabProps {
  icons: {
    solid: string;
    outline: string;
  };
  currentTab: boolean;
}

const bottomNavigationItems = [
  { icons: { solid: "home", outline: "home-outline" } },
  { icons: { solid: "compass", outline: "compass-outline" }, disabled: true },
  { icons: { solid: "bookmark", outline: "bookmark-outline" } },
  { icons: { solid: "person", outline: "person-outline" }, disabled: true },
];

const BottomNavigationTabWrapper = ({
  icons,
  currentTab,
  disabled,
  ...rest
}: BottomNavigationTabWrapperProps) => (
  <BottomNavigationTab
    icon={(props) => (
      <Icon name={currentTab ? icons.solid : icons.outline} {...props} />
    )}
    disabled={disabled}
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
      {bottomNavigationItems.map((item, key) => (
        <BottomNavigationTabWrapper
          key={key}
          icons={item.icons}
          currentTab={state.index === key}
          disabled={item.disabled}
        />
      ))}
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
