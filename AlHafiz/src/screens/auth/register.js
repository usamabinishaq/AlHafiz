import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import SIcon from 'react-native-vector-icons/FontAwesome';
import apiServices from '../../services/apiServices';
import colors from '../../assets/color/colors';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      name: null,
      email: null,
      password: null,
      confirm_password: null,
      loader: false,
    };
  }

  user_register = () => {
    this.setState({loader: true});
    if (
      this.state.email == null ||
      this.state.password == null ||
      this.state.password == null ||
      this.state.confirm_password == null
    ) {
      this.setState({loader: false});
      alert('Please fill all fields!');
    } else {
      let name = this.state.name;
      let email = this.state.email;
      let password = this.state.password;
      let confirm_password = this.state.confirm_password;

      var formdata = new FormData();
      formdata.append('name', name);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('confirm_password', confirm_password);

      apiServices.laraveljsPost('register', formdata).then(res => {
        this.setState({loader: false});
        if (res.message == 'User register successfully.') {
          AsyncStorage.setItem('@token', JSON.stringify(res.data.token));
          this.props.navigation.navigate('BottomNav');
        } else if (res.errors.email == 'The email has already been taken.') {
          alert('The email has already been taken!');
        }
      });
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}>
        <StatusBar hidden={true} />
        <ImageBackground
          style={[styles.logo, {flex: 0.3, justifyContent: 'center'}]}
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
        <View style={{flex: 0.7}}>
          <View
            style={{
              flex: 1,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.txtStyle}>Register</Text>
              <View style={styles.btnConatiner}>
                <View style={styles.inputLabel}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    Name
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
                  value={this.state.name}
                  onChangeText={txt => {
                    this.setState({name: txt});
                  }}
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
                    Email
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
                  onChangeText={txt => {
                    this.setState({email: txt});
                  }}
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
                    onChangeText={txt => {
                      this.setState({password: txt});
                    }}
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
                        ? this.setState({isShow: false})
                        : this.setState({isShow: true})
                    }
                  />
                </View>
              </View>
              <View style={styles.btnConatiner}>
                <View style={styles.inputLabel}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    Confirm Password
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
                    value={this.state.confirm_password}
                    onChangeText={txt => {
                      this.setState({confirm_password: txt});
                    }}
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
                        ? this.setState({isShow: false})
                        : this.setState({isShow: true})
                    }
                  />
                </View>
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
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '15%',
                  justifyContent: 'center',
                  left: 40,
                }}>
                <Text style={{fontWeight: 'bold', color: colors.black}}>
                  Have an account?
                  <Text
                    style={{color: colors.primary}}
                    onPress={() => this.props.navigation.replace('Login')}>
                    {' '}
                    Sign In
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.user_register();
                  }}>
                  <Image
                    style={{width: 100, height: 75, bottom: 25}}
                    source={require('../../assets/images/btn.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
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
    resizeMode: 'stretch',
  },
  inputLabel: {
    width: 140,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: '10%',
  },
});
