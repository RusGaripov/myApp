import React from 'react';
import {View, Text, Button} from 'react-native';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider, Layout} from 'react-native-ui-kitten';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {HomeScreen} from '../screens/HomeScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {NewFormScreen} from '../screens/NewFormScreen';
import {LoginScreen} from '../screens/auth/Login';
import {RegisterScreen} from '../screens/auth/Register';




const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Detail: DetailScreen,
        Login: LoginScreen,
        Register: RegisterScreen,
        NewForm:NewFormScreen
    },
    {
        initialRouteName: 'Login',
    },
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
