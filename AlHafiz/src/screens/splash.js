import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../assets/color/colors';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setTimeCall();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        this.props.navigation.replace('BottomNav');
        // this.props.navigation.replace('Subscription');
      } else {
        this.props.navigation.replace('Login');
      }
    } catch (e) {
      // error reading value
    }
  };
  setTimeCall = () => {
    setTimeout(() => {
      this.getData();
    }, 2000);
  };
  
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: 'center',
        }}>
        <StatusBar hidden={true} />
        <Image
          style={styles.logo}
          source={require('../assets/images/icon.png')}
          resizeMode="contain"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    height: '75%',
    width: '70%',
    alignSelf: 'center',
  },
});
