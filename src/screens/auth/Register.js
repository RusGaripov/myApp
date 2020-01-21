import React from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    ImageBackground,
} from 'react-native';

/*******************/
import {
    Input,
    Layout,
    Button,
    Icon,
    Text,
    List,
    ListItem,

} from 'react-native-ui-kitten';



export class RegisterScreen extends React.Component {

    state = {
        login: '',
        password: '',
        token: '',
        liked: false,
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
        axios.post('http://studentapi.myknitu.ru/register/', data
        ).then(res => {
            if (res.data.token) {
                this.props.navigation.navigate('Home');
                this.setState = {token: res.token}
            }
        });
    };

    state = {};

    render() {
        return (
            <ImageBackground source={require('../../assets/image/register.jpg')} style={styles.backgroundImage}>
                <Layout style={styles.container}>
                    <Input
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
                    <Text >
                        token: {this.state.token}
                    </Text>
                </Layout>
                <Layout style={styles.bottomEl}>
                    <Text style={styles.LinkLogin}
                          onPress={() => this.props.navigation.navigate('Login')}>
                        Do you have an account? Sign In
                    </Text>
                </Layout>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        paddingVertical: 7,
        paddingHorizontal: 8,

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
    },
    button: {
        width: 320,
        marginVertical: 5,
    },
    bottomEl: {
        flex: 0.5,
        position: 'absolute',
        alignItems: 'flex-end',
        bottom: 7,
        backgroundColor: 'transparent',
    },
    LinkLogin: {
        fontFamily: 'Cochin',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },

});
