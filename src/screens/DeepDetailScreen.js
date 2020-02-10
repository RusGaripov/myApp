import React, { Component } from 'react';
import { Modal, Text, View, TextInput, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import accounts from "../data/accounts.json"
import categories from "../data/categories.json"
import Moment from 'react-moment';
import ModalExample from '../components/Picker';
//import ModalForAccounts from '../components/Picker_Accounts';
import MyDatePicker from '../components/DatePicker'
import DatePicker from 'react-native-datepicker'
import { AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { resetTo } from '../helpers/Screens'




export class DeepDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: accounts,
            categories: categories,
            title: this.props.navigation.getParam('title'),
            data: this.props.navigation.getParam('data'),
            id: this.props.navigation.getParam('id'),
            amount: this.props.navigation.getParam('amount'),
            description: this.props.navigation.getParam('description'),
            category: this.props.navigation.getParam('category'),
            activeLeft: true,
            activeCenter: false,
            activeRight: false,
            selectField: 'Справа',
            modalVisible: false,
            selectedItemId: 0,
            modalVisible: false,
            selectedItemId: 0,
            date: this.props.navigation.getParam('date'),
            text: this.props.navigation.getParam('amount') / 100 + ' ' + "₽",
            text_2: this.props.navigation.getParam('description'),
           
        }
    }
    componentDidMount() {
        const category = this.state.categories.filter(f => f.id === this.state.accounts[0].transactions[0].category)[0].title

        this.setState({ category })

    }



    
    addItemQuantity = (title, category, account) => {
    //    alert(category)
        //alert(title)
        this.setState({
           category:title
       })
    
   };


    saveInfo = () => {
        const { title, amount, id, description, category, date, activeLeft } = this.state
        let obj
        if (activeLeft)
            obj = {
                id: id,
                title: title,
                amount: '-' + this.state.text,
                description: this.state.text_2,
                category: category,
                date: date,
                categories: categories,
            }
        else {
            obj = {
                id: id,
                title: title,
                amount: this.state.text,
                description: this.state.text_2,
                category: category,
                date: date,
                categories: categories,
            }
        }
        AsyncStorage.setItem('trans', JSON.stringify(obj), (callback) => {
            // this.props.navigation.navigate('Detail');
        })



    }


    displayInfo = async () => {

        try {
            let trans = await AsyncStorage.getItem('trans');
            let parsed = JSON.parse(trans);
            alert(this.state.category)
        }
        catch{
            alert(error)
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.leftHeader}
                        onPress={() => {
                            this.props.navigation.navigate('Detail')
                        }}
                    ><Text style={styles.leftHeaderText}>Назад</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.centerHeader}
                        onPress={this.displayInfo}
                    ><Text style={styles.centerHeaderText}>Операция</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.rightHeader}
                        onPress={this.saveInfo}
                    ><Text style={styles.rightHeaderText}>Сохранить</Text></TouchableOpacity>
                </View>
                <View style={styles.menu}>
                    {this.state.activeLeft ? <TouchableOpacity style={styles.leftMenu}
                        onPress={() => {
                            this.setState({
                                activeLeft: true,
                                activeCenter: false,
                                activeRight: false
                            })
                        }}
                    ><Text style={styles.leftMenuText}>Платеж</Text>
                    </TouchableOpacity>
                        : <TouchableOpacity style={styles.leftMenu_2}
                            onPress={() => {
                                this.setState({
                                    activeLeft: true,
                                    activeCenter: false,
                                    activeRight: false
                                })
                            }}
                        ><Text style={styles.leftMenuText_2}>Платеж</Text>
                        </TouchableOpacity>}

                    {!this.state.activeCenter ? <TouchableOpacity style={styles.centerMenu}
                        onPress={() => {
                            this.setState({
                                activeLeft: false,
                                activeRight: false,
                                activeCenter: true,
                            })
                        }}

                    ><Text style={styles.centerMenuText}>Поступление</Text></TouchableOpacity>
                        : <TouchableOpacity style={styles.centerMenu_2}
                            onPress={() => {
                                this.setState({
                                    activeLeft: false,
                                    activeRight: false,
                                    activeCenter: true,
                                })
                            }}
                        ><Text style={styles.centerMenuText_2}>Поступление</Text></TouchableOpacity>}


                    {!this.state.activeRight ? <TouchableOpacity style={styles.rightMenu}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    >
                        {/*    <ModalForAccounts title={'Перевод'} selectField={'Справа'} />

                        <ModalForAccounts selectField='Справа' />*/}
                        {/*<Text style={styles.rightMenuText}>Перевод</Text>*/}
                        <Text style={styles.rightMenuText}>Перевод</Text>
                    </TouchableOpacity>

                        : <TouchableOpacity style={styles.rightMenu_2}
                            onPress={() => {
                                this.setModalVisible(true);
                            }}
                        >{/*<Text style={styles.rightMenuText_2}>Перевод</Text>*/}
                            {/*    <ModalForAccounts title={'Перевод'} selectField={'Справа'} callback={(data) => { }} />
                            <ModalForAccounts selectField='Справа' />*/}
                            <Text style={styles.rightMenuText_2}>Перевод</Text>
                        </TouchableOpacity>}
                </View>

                <View style={styles.listItem}>
                    <View style={styles.firstColumnStyle}>
                        <Text style={styles.listTitle}>Дата</Text>
                        <Text style={styles.listTitle}>Счет</Text>
                        <Text style={styles.listTitle}>Категория</Text>
                        <Text style={styles.listTitle}>Описание</Text>
                        <Text style={styles.listTitle}>Сумма</Text>
                    </View>

                    <View style={styles.secondColumnStyle}>
                        {/*   <Moment format="DD.MM.YYYY" style={styles.listTitle_2} element={Text} unix>{this.state.accounts[0].transactions[0].date}</Moment>*/}
                        <DatePicker
                            style={styles.datepicker}
                            date={this.state.date}
                            mode="datetime"
                            showIcon={false}
                            placeholder="select date"
                            format="DD-MM-YYYY "
                            minDate="2019-01-01"
                            maxDate="2030-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={
                                {
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        paddingTop: 0,
                                        marginLeft: 0,
                                        borderWidth: 0,
                                        borderColor: 'black',
                                        opacity: 2,
                                    },
                                    dateText: {
                                        fontSize: 16,
                                        marginTop: -8,
                                    }
                                    // ... You can check the source to find the other keys.
                                }
                            }
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />



                        {/*  <View>
                            <MyDatePicker />
                      </View>*/}

                        {/*<TextInput style={styles.listTitle_2} value={this.state.title} />*/}
                        <View style={styles.listTitle_3}>
                            {/*    <ModalForAccounts title={'Наличные'} selectField={'Центр'} callback={(data) => { }} />
                            <ModalForAccounts selectField='Центр' title={this.state.title}/>*/}
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}
                            >
                                <Text style={styles.listTitle_2}>{this.state.title}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.listTitle_3}>
                            <ModalExample title={this.state.category} selectField={'Центр'}  addItemQuantityPress={this.addItemQuantity} />
                        </View>
                        {/*  <Text style={styles.listTitle_2}
                        >{this.state.categories.filter(f => f.id === this.state.accounts[0].transactions[0].category)[0].title}</Text>*/}
                        <TextInput style={styles.listTitle_2} onChangeText={(text_2) => this.setState({ text_2 })} value={this.state.text_2} />
                        {!this.state.activeCenter ? <TextInput style={styles.listTitle_2} onChangeText={(text) => this.setState({ text })} value={this.state.text} />
                            : <TextInput style={styles.listTitle_2_green} onChangeText={(text) => this.setState({ text })} value={this.state.text} />}
                    </View>
                    <View style={styles.forwardContainer}>
                        <Image source={require('../assets/image/forward.png')} style={styles.forward} />
                        <Image source={require('../assets/image/forward.png')} style={styles.forward} />
                        <Image source={require('../assets/image/forward.png')} style={styles.forward} />

                    </View>

                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.listAndCloser}>
                        <View style={styles.list}>
                            <FlatList
                                data={DATA}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.groupModal}>
                                        <TouchableOpacity
                                            onPress={(id) => this._onPress(item, id)}>
                                            <View style={styles.subItem}>
                                                <Text style={styles.subItemText}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.checkbox}>
                                            {
                                                item.id == this.state.selectedItemId ? <Image
                                                    source={require('../assets/image/check.png')} style={styles.check} /> : null}
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                        <View style={styles.closerContainer} >
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}><Image source={require('../assets/image/closer.png')} style={styles.closer}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>

            </View >


        );
    }
}









const styles = StyleSheet.create({
    datepicker: {
        width: 150,
        marginTop: 10,
        marginBottom: 0,
        paddingRight: 60,
        marginLeft: 0,
    },
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20
    },
    leftHeader: {
        height: 30
    },
    leftHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'dodgerblue'
    },
    centerHeader: {
        height: 30
    },
    centerHeaderText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    rightHeader: {
        height: 30,
    },
    rightHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'dodgerblue'
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 20,
        borderRadius: 5
    },
    leftMenu: {
        height: 40,
        backgroundColor: 'dodgerblue',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        flexGrow: 1
    },
    leftMenuText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        paddingTop: 5
    },
    leftMenu_2: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        flexGrow: 1
    },
    leftMenuText_2: {
        fontSize: 18,
        color: 'dodgerblue',
        alignSelf: 'center',
        paddingTop: 5
    },
    centerMenu: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        flexGrow: 1
    },
    centerMenuText: {
        fontSize: 18,
        color: 'dodgerblue',
        alignSelf: 'center',
        paddingTop: 5
    },
    centerMenu_2: {
        height: 40,
        backgroundColor: 'dodgerblue',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        flexGrow: 1
    },
    centerMenuText_2: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        paddingTop: 5
    },
    rightMenu: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        flexGrow: 1
    },
    rightMenuText: {
        fontSize: 18,
        color: 'dodgerblue',
        alignSelf: 'center',
        paddingTop: 5,

    },
    rightMenu_2: {
        backgroundColor: 'dodgerblue',
        height: 40,
        borderColor: 'dodgerblue',
        borderWidth: 1,
        flexGrow: 1
    },
    rightMenuText_2: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        paddingTop: 5,

    },


    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingTop: 30,
        paddingHorizontal: 4
    },
    firstColumnStyle: {
        paddingLeft: 15,
        flexDirection: "column",


    },
    secondColumnStyle: {
        paddingLeft: 30,
        flexDirection: "column",
    },
    forwardContainer: {
        marginTop: -12,
        flexDirection: 'column',
        height: 180,
        justifyContent: 'space-evenly',
        paddingRight: 5
    },

    listTitle: {
        fontSize: 16,
        height: 50,
        paddingTop: 15
    },
    listTitle_2: {
        height: 50,
        paddingTop: 15,
        fontSize: 16,
    },
    listTitle_2_green: {
        color: 'green',
        height: 50,
        paddingTop: 15,
        fontSize: 16,
    },


    listTitle_3: {
        height: 50,
        fontSize: 16,

    },

    forward: {
        width: 15,
        height: 15,

    },

    head: {
        alignSelf: "flex-start",
        fontSize: 22,
        paddingTop: 10,
        paddingLeft: 18
    },
    keller: {
        height: 45,
        backgroundColor: '#808080',
        flexDirection: 'row',
        justifyContent: "space-around",

    },
    kellerText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',

    },
    container_2: {
        flexDirection: 'row',

    },
    miniContainer: {

    },

    title: {
        fontSize: 16,

    },
    listAndCloser: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    list: {
        paddingTop: 20,
        paddingLeft: 10
    },

    selected: {
        fontSize: 16,
        paddingTop: 15,
        paddingLeft: 5

    },
    groupModal: {
        width: 180,
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'space-between'
    },
    subItemText: {
        fontSize: 16,
    },
    checkbox: {
        paddingRight: 0,
    },
    closerContainer: {
        paddingTop: 20,
        paddingRight: 20,
        alignItems: 'flex-end'

    },
    closer: {
        width: 26,
        height: 26,
    },

    buttonText: {
        flexDirection: 'row',


    },
    check: {
        width: 20,
        height: 20
    }



})

const DATA = [
    {
        id: 1,
        title: 'Наличные',
    },
    {
        id: 2,
        title: 'Тинькофф',
    },
    {
        id: 3,
        title: 'Тинькофф Бизнес',
    },
    {
        id: 4,
        title: 'Сбербанк',
    },
    {
        id: 5,
        title: 'Яндекс.Деньги',
    },
    {
        id: 6,
        title: 'Альфа Банк',
    },

];

