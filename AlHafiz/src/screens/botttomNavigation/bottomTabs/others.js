import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import apiServices from '../../../services/apiServices';
import colors from '../../../assets/color/colors';

const Others = ({navigation, route}) => {
  const [loader, setLoader] = useState();
  const [data, setData] = useState();
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        setLoader(true);
        setToken(value);
        apiServices.laraveljsGet('audio/all', value).then(res => {
          setData(res.data);
          setLoader(false);
          setRefresh(false);
        });
      } else {
        setLoader(true);
        apiServices.laraveljsGet('audio', value).then(res => {
          setData(res.data);
          setLoader(false);
        });
      }
    } catch (e) {}
  };

  const onRefresh = async () => {
    await getAsyncData();
  };

  renderChild = item => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '2.5%',
          padding: '2.5%',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: colors.primary,
        }}
        onPress={() => {
          navigation.navigate('PlayTrack', {
            item: {
              item: item,
              token: token,
            },
          });
        }}>
        <View>
          <Text
            style={{
              fontSize: 17,
              color: colors.black,
              paddingLeft: '2.5%',
            }}>
            <Text style={{fontWeight: 'bold'}}>{item.surah}</Text>
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 12.5,
                color: colors.black,
                textAlign: 'center',
                paddingLeft: '5%',
              }}>
              {item.author.name}
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: colors.black,
                textAlign: 'center',
                paddingRight: '2.0%',
              }}></Text>
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
          }}>
          <Icon name={'arrow-right'} size={20} color={colors.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 0.1,
          backgroundColor: colors.primary,
          elevation: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            paddingLeft: '5%',
            color: colors.white,
          }}>
          Others
        </Text>
      </View>
      {loader == true ? (
        <ActivityIndicator
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}
          size="small"
          color={colors.primary}
        />
      ) : null}
      <View style={{flex: 0.9}}>
        <View>
          <FlatList
            data={data}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => renderChild(item)}
            refreshControl={
              <RefreshControl
                colors={[colors.secondPrimary]}
                refreshing={refresh}
                onRefresh={() => onRefresh()}
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Others;
const styles = StyleSheet.create({});
