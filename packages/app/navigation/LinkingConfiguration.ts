import * as Linking from 'expo-linking'

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              TabHome: 'homeOne',
              TabSearch: 'homeOne',
              TabAdd: 'homeOne',
              TabNews: 'homeOne',
              TabProfile: 'homeOne',
            },
          },
          Direct: {
            screens: {
              TabAddScreen: 'addOne',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
}
