import React from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

/*******************/
import {
    Input,
    Layout,
    Button,
    Icon,
    Text,
} from 'react-native-ui-kitten';


export class LoginScreen extends React.Component {
    state = {
        login: '',
        password: '',
        token: '',
        liked: false,
        mess: '',
    };


    setToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(token));
        } catch (error) {
            console.log('Что то не так', error);
        }
    };

    getToken = async () => {
        try {
            let tokenData = await AsyncStorage.getItem('token');
            this.state.token = JSON.parse(tokenData);
            if (this.state.token !== null) {
                this.props.navigation.navigate('Home');
            }
        } catch (error) {
            console.log('Что то не так', error);
        }
        console.log('token is: ', this.state.token);
        return false;
    };

    errMess = () => {
        this.setState({mess: 'Логин или пароль неверный'});
    };

    inputChanged = () => {
        this.setState({mess: ''});
    };

    LoginChange = (login) => {
        this.setState({login});
    };
    PasswordChange = (password) => {
        this.setState({password});
    };

    SendIt = (login, password) => {

        const data = {
            'login': this.state.login,
            'password': this.state.password,
        };
        axios.post('http://studentapi.myknitu.ru/auth/', data,
        ).then(res => {
            console.log(res.data);
            if (res.data.token) {
                //this.props.navigation.navigate('Home');
                this.setToken(res.data.token);
                this.getToken();
                //console.log('your token: ', res.data.token);
            }
            this.errMess();
        });
    };

    render() {
        if (this.getToken()) {
            return (<ImageBackground source={require('../../assets/image/login.jpg')} style={styles.backgroundImage}>
                <Layout style={styles.container}>
                    <Text style={styles.errMess}>{this.state.mess}</Text>
                    <Input
                        onPress={this.inputChanged}
                        style={styles.input}
                        size='small'
                        placeholder='Логин'
                        value={this.state.login}
                        onChangeText={this.LoginChange}
                    />
                    <Input
                        style={styles.input}
                        size='small'
                        placeholder='Пароль'
                        value={this.state.password}
                        onChangeText={this.PasswordChange}
                        secureTextEntry={true}
                    />
                    <Button
                        style={styles.button}
                        size='medium'
                        onPress={this.SendIt}

                    >Войти</Button>
                </Layout>
                <Layout style={styles.bottomEl}>
                    <Text style={styles.LinkLogin}
                          onPress={() => this.props.navigation.navigate('Register')}>
                        Зарегистроваться
                    </Text>
                </Layout>
            </ImageBackground>);
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        paddingVertical: 7,
        paddingHorizontal: 8,
        flex: 0.3,

    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputLayout: {
        backgroundColor: 'transparent',
    },
    input: {
        width: 320,
        marginVertical: 1,
        borderColor: 'darkslateblue',
        shadowColor: 'darkslateblue',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    button: {
        width: 320,
        marginVertical: 5,
        backgroundColor: '#3568FF',
        borderColor: '#3568FF',
    },
    bottomEl: {
        flex: 0.5,
        position: 'absolute',
        alignItems: 'flex-end',
        bottom: 15,
        backgroundColor: 'transparent',
    },
    LinkLogin: {
        fontFamily: 'Cochin',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#5858e2',
    },
    errMess: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: -10,
        paddingTop: 10,
    }


});
