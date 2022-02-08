import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player'

import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { DATA } from '../model/info';
import Feath from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import colors from '../assets/color/colors';

const togglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null)
    if (playbackState == State.Paused) {
      await TrackPlayer.play();
    }
    else {
      await TrackPlayer.pause();
    }
}

const PlayTrack = ({ route, navigation }) => {

  let listOfInfo;

  const [dataInfo, setData] = useState()
  const [info, setInfo] = useState(route)
  const [comment, setComment] = useState()
  const [commtxt, setCommTxt] = useState('')
  const [forcomment, setForComment] = useState();
  const [dt, setDt] = useState(null)

  const playbackState = usePlaybackState();
  const progress = useProgress();

  useEffect(() => {
    listOfInfo = route.params.item;
    getComments(listOfInfo)
    setForComment(listOfInfo)
    setInfo(listOfInfo.item)
    setNewData()
  }, []);

  const setNewData = () => {
    let temp = [listOfInfo.item]
    temp.map((item, index) => {
      item.url = item.source
      item.artist = item.author.name;
      item.title = item.surah;
      temp[index] = item;

      setUpPlayer(temp);
    })
  }

  const getComments = (listOfInfo) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append('Authorization', `Bearer ${JSON.parse(listOfInfo.token)}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://alhafiz.afssquare.com/api/audio/${listOfInfo.item.id}/${'comment'}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setData(result.data)
      })
      .catch(error => console.log('error', error));
  }

  const postComments = (comm, dte) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append('Authorization', `Bearer ${JSON.parse(forcomment.token)}`);

    var formdata = new FormData();
    formdata.append("message", comm);
    formdata.append("time", dte);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`https://alhafiz.afssquare.com/api/audio/${forcomment.item.id}/${'comment'}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        getComments(forcomment)
      })
      .catch(error => console.log('error', error));
  }

  const setUpPlayer = async (songs) => {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.add(songs);
  }

  /* Separator component rendered between each item on the list */
  const SeparatorComponent = () => {
    return <View style={{}} />
  }

  const renderChildItem = item => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ padding: '2.5%', flex: 0.25 }}>
          <Text style={{ color: colors.black, textAlign: 'center' }}>
            {item ? item.audio.author.name : null}
          </Text>
          <Text
            style={{
              color: colors.skyBlue,
              fontSize: 12,
              textAlign: 'center',
            }}>
            {item.time ? item.time : '00:00'}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.lightGray,
            flex: 0.75,
            marginRight: '2.5%',
            padding: '2.5%',
            borderRadius: 5,
          }}>
          <Text style={{ color: colors.black }}>{item ? item.message : null}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.1,
          backgroundColor: colors.primary,
          elevation: 10,
          alignItems: 'center',
          flexDirection: 'row'
        }}>
        <Icon size={20} name="arrow-left" color="#fff" style={{ marginLeft: 10 }} onPress={() => { navigation.navigate('BottomNav') }} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            paddingLeft: '5%',
            color: colors.white,
          }}>
          {info.surah}
        </Text>
      </View>
      <View style={{ flex: 0.9 }}>
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2.5%',
            borderBottomWidth: 1.5,
            borderColor: colors.primary,
          }}>
          <View>
            <Text
              style={{
                fontSize: 17,
                color: colors.black,
                paddingLeft: '4.5%',
              }}>
              <Text style={{ fontWeight: 'bold' }}>{info.surah}</Text>
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: colors.black,
                paddingLeft: '4.5%',
              }}>
              <Text style={{ fontWeight: 'bold' }}>{info.author ? info.author.name : null}</Text>
            </Text>
            <Slider
              style={{ width: 270, paddingBottom: '2.5%' }}
              minimumValue={0}
              maximumValue={progress.duration}
              value={progress.position} //dynamic value accordi ng to screen
              minimumTrackTintColor={colors.primary}
              onSlidingComplete={async (value) => {
                await TrackPlayer.seekTo(value)
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 12.5,
                  color: colors.black,
                  textAlign: 'center',
                  paddingLeft: '5%',
                }}>
                {new Date(progress.position * 1000).toISOString().substr(14, 5)}
              </Text>
              <Text
                style={{
                  fontSize: 12.5,
                  color: colors.black,
                  textAlign: 'center',
                  paddingRight: '4.5%',
                }}>
                {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 35 / 2,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              togglePlayback(playbackState)
            }}>
            <Icon
              name={playbackState === State.Playing ? 'pause' : 'play'}
              size={20}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.7 }}>
          <FlatList
            data={dataInfo}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderChildItem(item)}
            initialNumToRender={5}
            ItemSeparatorComponent={SeparatorComponent}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 25,
              backgroundColor: colors.lightGray,
              flex: 1,
              margin: '1.5%',
            }}>
            <TextInput
              style={{
                paddingLeft: '5%',
                letterSpacing: 0.2,
                flex: 0.85,
              }}
              placeholder="Enter Comment At..."
              value={commtxt}
              onChangeText={(txt) => { setCommTxt(txt) }}
            />
            <Text style={{ fontSize: 11, flex: 0.15, padding: '2.0%' }}>
              {new Date(progress.position * 1000).toISOString().substr(14, 5)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (commtxt == '') {
                null
              }
              else {
                const dte = new Date(progress.position * 1000).toISOString().substr(14, 5)
                postComments(commtxt, dte)
                setCommTxt('')
              }
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              margin: '1.5%',
            }}>
            {/* {
              commtxt !== '' ? <Icon name={'send'} color={colors.white} size={20} style={{ marginLeft: 2 }} />
              :
                <Icon name={'microphone'} color={colors.white} size={20} />
              } */}
            <Icon name={'send'} color={colors.white} size={20} style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PlayTrack
