import React from 'react';
import {Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export class AuthProvider {

    setToken = async(token) => {
        try {
            await AsyncStorage.setItem("token", JSON.stringify(token));
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    getToken = async () => {
        try {
            let tokenData = await AsyncStorage.getItem("token");
            let data = JSON.parse(tokenData);
            if (data && data.toString().length) {
                return data;
            }
        } catch (error) {
            console.log("Something went wrong", error);
        }

    }

}
