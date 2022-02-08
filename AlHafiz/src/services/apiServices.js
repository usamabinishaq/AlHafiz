import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react';
import { DATA } from '../model/info';
import { LogBox } from 'react-native';
import asyncStorage from './asyncStorage';

class ApiServices {
    abc
    laraveljsUrl = 'https://alhafiz.afssquare.com/api'
    authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNTViMmNjYmQ4YjI2YWU2ZjBjZDAzYTdiZDBlMThiYjAxOWZlNmNhMGFkYzRmMzk3Zjk4ZjJkODU2YjIxYTlmZWI4YWU5NmM4MGVmYWJiYTEiLCJpYXQiOjE2NDMwMDMzNzIuMzcwMjI4LCJuYmYiOjE2NDMwMDMzNzIuMzcwMjMsImV4cCI6MTY3NDUzOTM3Mi4zNjgyNjIsInN1YiI6IjciLCJzY29wZXMiOltdfQ.Zk3QNIkTRrRblDgT8c6FbdMdK5QOE2ecmrNMIfsR7R_teETT6JMkbMBy_UXI__ZMqtoEg29qhqSYyf1jc5GTQ0c-oTJN9wnI0bK3DrcndR1BcGFpV7p7kun3KWJrzfJeSe-eJjRfRyy8S2q1tioFhUfznC8TfOa60oYXoBR79iM8XK2Pn9gE7Fb9ClXWkC8XvuH_ynYxwknQN2EefG45ZsE8k1bJIUn7JqVJ8fcIQboWpyeQz6WRiEkBdUfU-BtZp25CYHhAXhgJ9ynZc6j4GPdUwA_rKvuTgaLAHx2rCyo6TknmtxRNu04V2qNLXzFSa36r63yrxSv70OBnMvGtZkIlnFmyN5CDZzMvo6COnF1C8U11KphVb7MApT9clA4a48ipcQ1fkz5zjUukNGU27-sgQJlOsUO8OMhFlKdB3K_DptAjGKiaxsK0Kc8QykHZHXjBV7Ph68eD4-7YK1fSEE3N2O3YqPuZV37d0VP_e8DTLZslWR0itg86QFcQO4Em935wppN7PLb4yQNo-Vbh5Ci6qapebBzfHG1ALa0rk-OOnXqvM8nZ886_wc5y5gG6N29swipBWyuVFfL2lckan0JFV0jMVTGKoIEptNqDdkyrzsKPRcGAsorNX6E7FIIOb-HZcTrBdIm9rHdBHVZHpRnB_Go-MJWKXHO6qGUoSyk'

    ignoreLogs = LogBox.ignoreAllLogs();

    abc = asyncStorage.getStorageData().then((rp) => {
        return rp
    })

    initHeader() {
        console.log('fifth')
        let auth = {
            Accept: 'application/json',
            'Authorization': `Bearer ${this.abc._W}`,
        };
        return auth;
    }

    initHeaderPost() {
        let auth = {
            Accept: 'application/json',
            // 'Authorization': `Bearer ${this.authToken}`,
            // 'Content-Type': "application/json",
        };
        return auth;
    }

    laraveljsGet(endpoint,myHea) {
        console.log('A jao')
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${JSON.parse(myHea)}`);
        return new Promise((resolve, reject) => {
            fetch(`${this.laraveljsUrl}/${endpoint}`, {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            })
                .then(response => response.json())
                .then(res => {
                    console.log('res'+res)
                    resolve(res)
                })
                .catch((error) => {
                    console.log('Error ==>', error)
                    reject(error)
                })
        })
    }

    laraveljsPost(endpoint, body) {
        return new Promise((resolve, reject) => {
            fetch(`${this.laraveljsUrl}/${endpoint}`, {
                method: 'POST',
                headers: this.initHeaderPost(),
                redirect: 'follow',
                body: body,
            })
                .then(response => response.json())
                .then(res => {
                    resolve(res)
                })
                .catch((error) => {
                    alert('Please check your internet connection!')
                    resolve('error')
                    // reject('error')
                })
        })
    }
}

const apiServices = new ApiServices();
export default apiServices;
