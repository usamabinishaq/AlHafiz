import React, {useEffect, useState} from 'react';

import AddTrack from './src/screens/addTrack';
import BottomNav from './src/screens/botttomNavigation/bottomNav';
import Login from './src/screens/auth/login';
import MainScreen from './src/screens/mainScreen';
import MainView from './src/screens/test';
import MyLibrary from './src/screens/botttomNavigation/bottomTabs/mylibrary';
import {NavigationContainer} from '@react-navigation/native';
import Others from './src/screens/botttomNavigation/bottomTabs/others';
import PlayTrack from './src/screens/track';
import Register from './src/screens/auth/register';
import Splash from './src/screens/splash';
import colors from './src/assets/color/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyLibrary"
          component={MyLibrary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Others"
          component={Others}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="PlayTrack"
          component={PlayTrack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainView"
          component={MainView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTrack"
          component={AddTrack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
