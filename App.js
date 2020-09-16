import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
//AppLoading espera la carga de todos los assets antes de mostrar las views
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

//store -> Provider
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'summer': require('./assets/fonts/Summer-Garden.ttf'),
    'song': require('./assets/fonts/Please-write-me-a-song.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    />;
  }

  return <Provider store={store}><MealsNavigator /></Provider>;
}
