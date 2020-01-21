import React, { Component } from 'react';
import { Animated, Button, Text, View, Platform, TextInput, StyleSheet, Picker, Modal } from 'react-native';
import { light as lightTheme, mapping } from '@eva-design/eva';
import AsyncStorage from '@react-native-community/async-storage';
import ModalExample from '../components/Picker';
import MyDatePicker from '../components/DatePicker'


export class NewFormScreen extends React.Component {
    state = {
        language: '',
        date: new Date()
    }
 
    
    componentWillMount(): void {
        //   this.checkMount()
    }
    checkMount = async () => {
        try {
            let cd = await AsyncStorage.getItem('token');
            cd = JSON.parse(cd)
            if (cd === null) {
                this.props.navigation.navigate('Login');
            } else {
                this.props.navigation.navigate('Home');

            }

        } catch (e) {
            console.log(e);
        }
    }
    logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate('Home');
        } catch (e) {
            console.log('token removed');
        }
    }

    render() {
        return (
            <>
                <View><Text style={styles.header}>Enhanced info</Text></View>
                <View style={styles.form}>
                    <View style={styles.subForm1} mapping={mapping}
                        theme={lightTheme}>
                        <Text style={styles.elems}>
                            Sum
                </Text>
                        <Text style={styles.elems}>
                            Account
                </Text>
                        <Text style={styles.elems}>
                            Date
                </Text>
                        <Text style={styles.elems}>
                            Description
                </Text>
                    </View>
                    <View style={styles.subForm2} mapping={mapping}
                        theme={lightTheme}>
                        <Text style={styles.elemsSum}>
                            1900,00
                </Text>
                        <View>
                            <ModalExample />
                        </View>
                        <View>
                            <MyDatePicker />
                        </View>

                        <Text style={styles.elems}>
                            Description
                </Text>
                    </View>
                </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        paddingTop: 20,
        alignSelf: 'flex-start',
        paddingLeft: 55
    },
    elems: {
        fontSize: 18,
        paddingTop: 30,

    },
    elemsSum: {
        fontSize: 18,
        marginTop: 0,
        marginBottom: 10


    },
    form: {
        flexDirection: 'row',
        paddingTop: 20,
        justifyContent: 'space-around'
    },
    subForm2: {
        alignSelf: 'flex-end',

    },
    drop: {
        backgroundColor: 'green',
        fontSize: 45
    },

})

