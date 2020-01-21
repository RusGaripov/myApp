import React from 'react';
import { mapping, light as darkTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AsyncStorage } from 'react-native';

import { HomeScreen } from './screens/HomeScreen';
import { DetailScreen } from './screens/DetailScreen';
import { DeepDetailScreen } from './screens/DeepDetailScreen';
import { AddTransactionScreen } from './screens/AddTransactionScreen';
import { LoginScreen } from './screens/auth/Login';
import { RegisterScreen } from './screens/auth/Register';
import { NewFormScreen } from './screens/NewFormScreen';


const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
            },
        },
        Detail: {
            screen: DetailScreen,
            navigationOptions: {
                header: null,
            },
        },
        NewForm: NewFormScreen,
        DeepDetail: {
            screen: DeepDetailScreen,
            navigationOptions: {
                header: null,
            },
        },
        AddTransaction: {
            screen: AddTransactionScreen,
            navigationOptions: {
                header: null,
            },
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
            },
        },
        Register: {
            screen: RegisterScreen,
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        initialRouteName: 'Home',
    },
);



const AppContainer = createAppContainer(RootStack);

const App = () => (
    <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <AppContainer />
    </ApplicationProvider>
);

export default App;
