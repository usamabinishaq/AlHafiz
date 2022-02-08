import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import SIcon from 'react-native-vector-icons/FontAwesome';
import apiServices from '../../services/apiServices';
import colors from '../../assets/color/colors';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      email: null,
      password: null,
      loader: false
    };
  }

  user_login = () => {
    this.setState({loader: true})
    if (this.state.email == null || this.state.password == null) {
      this.setState({loader: false})
      alert('Please fill all fields!')
    }
    else {
      let email = this.state.email;
      let password = this.state.password;

      var formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);

      apiServices.laraveljsPost('login',formdata).then((res) => {
        this.setState({loader: false})
        if (res.message == 'User login successfully.') {
          AsyncStorage.setItem('@token', JSON.stringify(res.data.token));
          this.props.navigation.navigate('BottomNav')
        }
        else if (res.errors.email == 'The selected email is invalid.' || res.errors.credentials == 'Unauthorised.') {
          alert('Please, make sure your email and password is correct!')
        }
      })
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}>
        <ImageBackground
          style={[styles.logo, { flex: 0.3, justifyContent: 'center' }]}
          source={require('../../assets/images/bottom.png')}>
          <Image
            style={{
              width: '75%',
              height: '75%',
              alignSelf: 'center',
            }}
            source={require('../../assets/images/icon.png')}
            resizeMode="contain"
          />
        </ImageBackground>
        <View style={{ flex: 0.7 }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.txtStyle}>Login</Text>
            <View style={styles.btnConatiner}>
              <View style={styles.inputLabel}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Email & Mobile
                </Text>
              </View>
              <TextInput
                style={{
                  width: '100%',
                  height: 45,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginLeft: '5%',
                  color: colors.primary,
                }}
                value={this.state.email}
                onChangeText={(txt) => { this.setState({ email: txt }) }}
              />
            </View>
            <View style={styles.btnConatiner}>
              <View style={styles.inputLabel}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Password
                </Text>
              </View>
              <View
                style={{
                  flex: 0.85,
                  justifyContent: 'center',
                }}>
                <TextInput
                  secureTextEntry={this.state.isShow == true ? true : false}
                  style={{
                    width: '100%',
                    height: 45,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: '15%',
                    color: colors.primary,
                  }}
                  value={this.state.password}
                  onChangeText={(txt) => { this.setState({ password: txt }) }}
                />
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={this.state.isShow == true ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.primary}
                  onPress={() =>
                    this.state.isShow == true
                      ? this.setState({ isShow: false })
                      : this.setState({ isShow: true })
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '15%',
                justifyContent: 'center',
                left: 40,
              }}>
              <Text style={{ fontWeight: 'bold', color: colors.black }}>
                Don't have an account?
                <Text
                  onPress={() => this.props.navigation.replace('Register')}
                  style={{ color: colors.primary }}>
                  {' '}
                  Sign Up
                </Text>
              </Text>
              <TouchableOpacity
                onPress={() => { this.user_login() }}>
                <Image
                  style={{ width: 100, height: 75, bottom: 25 }}
                  source={require('../../assets/images/btn.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {this.state.loader == true ? (
              <ActivityIndicator
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}
                size="small"
                color={colors.primary}
              />
            ) : null}
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
  },
  inputLabel: {
    width: 100,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '3%',
    paddingRight: '3%',
    padding: '1%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.secondry,
    bottom: 40,
    left: 20,
    backgroundColor: colors.white,
    position: 'absolute',
  },
  btnConatiner: {
    marginTop: '10%',
    height: 50,
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 100,
    elevation: 12,
    flexDirection: 'row',
    alignSelf: 'center',

    alignItems: 'center',
  },
  txtStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: '10%',
  },
});
