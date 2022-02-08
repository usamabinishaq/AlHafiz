import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Feath from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Slider from '@react-native-community/slider';
import colors from '../assets/color/colors';

export default class AddTrack extends Component {
  audioRecorderPlayer = new AudioRecorderPlayer();
  dirs = RNFetchBlob.fs.dirs;
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      isPlay: false,
      recordTime: '00:00:00',
      track: null,
      test: null,
      pause: false,
      pauseResume: false,
      ayat: '',
      surah: '',
      audioPlayShow: false,
      audiolistenShow: false,
      uriI: '',
      duration: null,
      chee: null,
      loader: false,
    };
  }

  componentDidMount = async () => {
    await this.getAsyncData();
  };

  getAsyncData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');

      this.setState({token: value});
      if (this.state.token == null) {
        console.log('Not Found Token');
      }
    } catch (e) {
      // error reading value
    }
  };

  onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          const result = await this.audioRecorderPlayer.startRecorder();
          this.setState({uriI: result});
          this.audioRecorderPlayer.addRecordBackListener(e => {
            this.setState({
              recordSecs: e.currentPosition,
              recordTime: this.audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition),
              ),
            });
            return;
          });

          const uri = await this.audioRecorderPlayer.startRecorder(result);
          // this.setState({track: uri})
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    this.setState({track: result});
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pauseRecorder();
  };

  onResumeRecorder = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
  };

  onStartPlay = async () => {
    const msg = await this.audioRecorderPlayer.startPlayer(this.state.track);
    this.audioRecorderPlayer.addPlayBackListener(e => {
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  onPausePlayy = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  addTrack = () => {
    if (
      this.state.ayat == '' ||
      this.state.surah == '' ||
      this.state.track == null
    ) {
      alert('Please fill all fields!');
    } else {
      this.setState({loader: true});

      var myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Content-Type', 'multipart/form-data');
      myHeaders.append(
        'Authorization',
        `Bearer ${JSON.parse(this.state.token)}`,
      );

      var formdata = new FormData();
      formdata.append('surah', this.state.surah);
      formdata.append('ayat', this.state.ayat);
      // formdata.append("source", this.state.track);

      formdata.append('source', {
        uri: this.state.track,
        name: 'test.mp4',
        type: 'audio/mp4',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://alhafiz.afssquare.com/api/audio', requestOptions)
        .then(response => response.json())
        .then(result => {
          this.setState({loader: false});
          if (result.message == 'Audio created successfully.') {
            this.props.navigation.pop();
          } else {
            alert('Please check your internet connection!');
          }
          // this.setState({ test: result.data.source })
        })
        .catch(error => console.log('error', error));
    }
  };

  createTwoButtonAlert = () =>
    Alert.alert('Logout', 'Are you sure, you want to logout ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          AsyncStorage.removeItem('@token').then(() => {
            this.props.navigation.navigate('Splash');
          });
        },
      },
    ]);

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            flex: 0.1,
            backgroundColor: colors.primary,
            elevation: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon
            size={20}
            name="arrow-left"
            color="#fff"
            style={{marginLeft: 10}}
            onPress={() => {
              this.props.navigation.navigate('BottomNav');
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              paddingLeft: '5%',
              color: colors.white,
              width: '80%',
            }}>
            Add Track
          </Text>
          <Icon
            name="logout"
            size={20}
            style={{alignSelf: 'center'}}
            color={colors.white}
            onPress={() => {
              this.createTwoButtonAlert();
            }}
          />
        </View>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
            <Feath name="mic" size={50} color={colors.primary} />
          </View>
          <View style={{flex: 0.1}}></View>
          <View style={{flex: 0.4}}>
            <Text>
              {this.state.recordTime == null ? (
                <Text style={{fontSize: 35, color: colors.primary}}>
                  00:00:00
                </Text>
              ) : (
                <Text style={{fontSize: 35, color: colors.primary}}>
                  {this.state.recordTime}
                </Text>
              )}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: 15,
          }}>
          {
            <>
              {this.state.pause == false ? (
                <TouchableOpacity
                  onPress={() => {
                    this.onStartRecord();
                    this.setState({pause: true, audioPlayShow: false});
                  }}
                  style={{
                    elevation: 0.5,
                    shadowOpacity: 0.2,
                    borderRadius: 35,
                    backgroundColor: '#CDD5C0',
                    flexDirection: 'row',
                    width: '27%',
                    height: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feath name="mic" size={17} color={colors.primary} />
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 5,
                      color: colors.primary,
                    }}>
                    Record
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    elevation: 0.5,
                    shadowOpacity: 0.2,
                    borderRadius: 35,
                    backgroundColor: '#CDD5C0',
                    flexDirection: 'row',
                    width: '27%',
                    height: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {this.state.pauseResume == false ? (
                    <Feath
                      name="pause"
                      size={20}
                      color={colors.primary}
                      onPress={() => {
                        this.onPausePlay(), this.setState({pauseResume: true});
                      }}
                    />
                  ) : (
                    <Feath
                      name="play"
                      size={20}
                      color={colors.primary}
                      onPress={() => {
                        this.onResumeRecorder(),
                          this.setState({pauseResume: false});
                      }}
                    />
                  )}
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  this.onStopRecord(),
                    this.setState({
                      pause: false,
                      audioPlayShow: true,
                      pauseResume: false,
                    });
                }}
                style={{
                  elevation: 0.5,
                  shadowOpacity: 0.2,
                  borderRadius: 35,
                  backgroundColor: '#CDD5C0',
                  flexDirection: 'row',
                  width: '27%',
                  height: '60%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 17, color: colors.primary}}>Stop</Text>
              </TouchableOpacity>
            </>
          }
        </View>

        {this.state.audioPlayShow == true ? (
          <View
            style={{
              flex: 0.1,
              borderRadius: 5,
              alignItems: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              margin: '5%',
              borderColor: colors.primary,
            }}>
            {this.state.audiolistenShow == false ? (
              <View style={{margin: 10}}>
                <Feath
                  name="play"
                  size={19}
                  color={colors.primary}
                  onPress={() => {
                    this.onStartPlay(), this.setState({audiolistenShow: true});
                  }}
                />
              </View>
            ) : (
              <View style={{margin: 10}}>
                <Feath
                  name="pause"
                  size={19}
                  color={colors.primary}
                  onPress={() => {
                    this.onPausePlayy(),
                      this.setState({audiolistenShow: false});
                  }}
                />
              </View>
            )}
            <View style={{width: '60%'}}>
              <Text style={{fontSize: 17}}>
                {this.state.playTime ? this.state.playTime : '00:00:00'} /{' '}
                {this.state.recordTime ? this.state.recordTime : '00:00:00'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: '5%'}}>
                <Icon
                  name="delete"
                  size={19}
                  color={colors.red}
                  onPress={() => {
                    this.onPausePlay(),
                      this.setState({
                        audioPlayShow: false,
                        playTime: null,
                        recordTime: null,
                      });
                  }}
                />
              </View>
            </View>
          </View>
        ) : null}
        <View
          style={{
            margin: '5%',
            flex: 0.4,
            borderRadius: 10,
            backgroundColor: '#f1f1f1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.black,
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 0.2,
              }}>
              Surah
            </Text>
            <TextInput
              placeholder="Surah Name"
              style={{
                borderWidth: 1,
                flex: 0.8,
                height: 40,
                borderRadius: 5,
                borderColor: colors.primary,
              }}
              value={this.state.surah}
              onChangeText={txt => {
                this.setState({surah: txt});
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5%',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.black,
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 0.2,
              }}>
              Ayat
            </Text>
            <TextInput
              placeholder="Ayat No"
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                width: '75%',
                height: 40,
                flex: 0.8,
                borderRadius: 5,
                borderColor: colors.primary,
              }}
              value={this.state.ayat}
              onChangeText={txt => {
                this.setState({ayat: txt});
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.addTrack();
            }}
            style={{
              width: '25%',
              marginTop: 10,
              height: '12.5%',
              borderColor: '#FFF',
              borderWidth: 1,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.white,
                padding: '5%',
                fontSize: 15,
              }}>
              Save
            </Text>
          </TouchableOpacity>
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
      </SafeAreaView>
    );
  }
}
