import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageClass  {

    getStorageData = async () => {
        try {
            const value = await AsyncStorage.getItem('@token');
            if (value !== null) {
                // this.setState({ token: JSON.parse(value) })
                return JSON.parse(value);
            }
        } catch (error) { }
    };

}

const asyncStorage = new AsyncStorageClass();
export default asyncStorage;
