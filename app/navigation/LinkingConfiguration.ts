import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              HomeScreen: "home",
            },
          },
          TabTwo: {
            screens: {
              ProfileScreen: "navigate",
            },
          },
          TabThree: {
            screens: {
              ProfileScreen: "favorites",
            },
          },
          TabFour: {
            screens: {
              ProfileScreen: "profile",
            },
          },
        },
      },
      MovieInfo: {
        screens: {
          MovieInfoScreen: "movie-info",
        },
      },
      NotFound: "*",
    },
  },
};
