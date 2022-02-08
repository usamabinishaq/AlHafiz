import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import MyLibrary from './bottomTabs/mylibrary';
import Others from './bottomTabs/others';
import colors from '../../assets/color/colors';

const Tab = createMaterialBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="MyLibrary"
      activeColor={colors.white}
      barStyle={{backgroundColor: colors.primary, elevation: 10}}>
      <Tab.Screen
        name="MyLibrary"
        component={MyLibrary}
        options={{
          tabBarLabel: 'My Library',
          tabBarIcon: () => (
            <Icon name="bookshelf" color={colors.white} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Others"
        component={Others}
        options={{
          tabBarLabel: 'Others',
          tabBarIcon: () => (
            <Icon name="account" color={colors.lightGray} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
