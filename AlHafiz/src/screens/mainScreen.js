import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import SIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/color/colors';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}>
        <StatusBar hidden={true} />
        <ImageBackground
          style={{
            flex: 0.45,
            justifyContent: 'center',
          }}
          source={require('../assets/images/bottom.png')}>
          <Image
            style={styles.logo}
            source={require('../assets/images/top.gif')}
          />
        </ImageBackground>
        <View style={{flex: 0.6}}>
          <View
            style={{
              flex: 0.2,
            }}>
            <Image
              style={{
                width: 125,
                height: 125,
                alignSelf: 'center',
              }}
              source={require('../assets/images/ic_3.png')}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
            }}>
            <View style={styles.btnConatiner}>
              <View style={{marginLeft: '7.5%', flex: 0.1}}>
                <SIcon name="google" size={20} color={colors.primary} />
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  flex: 0.73,
                  padding: '3.5%',
                }}>
                <Text style={styles.txtStyle}>GOOGLE</Text>
              </View>
            </View>
            <View style={styles.btnConatiner}>
              <View style={{marginLeft: '7.5%', flex: 0.1}}>
                <SIcon name="facebook" size={20} color={colors.primary} />
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  flex: 0.73,
                  padding: '3.5%',
                }}>
                <Text style={styles.txtStyle}>FACEBOOK</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.btnConatiner}>
              <View style={{marginLeft: '7.5%', flex: 0.1}}>
                <SIcon name="user" size={20} color={colors.primary} />
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  flex: 0.73,
                  padding: '3.5%',
                }}>
                <Text style={styles.txtStyle}>GUEST</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  btnConatiner: {
    marginTop: '10%',
    height: 50,
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 100,
    elevation: 12,
    flexDirection: 'row',

    alignItems: 'center',
  },
  txtStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,

    textAlign: 'center',
  },
});
