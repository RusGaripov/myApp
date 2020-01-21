import React, { Component } from 'react';
import { Modal, Text, View, TextInput, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import accounts from "../data/accounts.json"
import categories from "../data/categories.json"
import Moment from 'react-moment';
import ModalExample from '../components/Picker';
//import ModalForAccounts from '../components/Picker_Accounts';
import MyDatePicker from '../components/DatePicker'


export class AddTransactionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: list,
            accounts: accounts,
            categories: categories,
            title: list.id,
            amount: accounts[0].transactions[0].amount,
            description: accounts[0].transactions[0].description,
            category: null,
            activeLeft: true,
            activeCenter: false,
            activeRight: false,
            selectField: 'Справа',
            modalVisible: false,
            selectedItemId: 0,
            modalVisible: false,
            id: props.id,
            selectedItemId: 0
        }
    }
    componentDidMount() {
        const category = this.state.categories.filter(f => f.id === this.state.accounts[0].transactions[0].category)[0].title
        this.setState({ category })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    addData = () => {
        this.props.accounts.push({
            description: this.state.description,
            category: this.state.category,
            title: this.state.title,
            amount: this.state.amount,
            date: this.state.date
        });
    }
    _onPress(account) {
        this.setState({ title: account.title, selectedItemId: account.id });
        this.setModalVisible(!this.state.modalVisible);
        array.push(account.title)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.leftHeader}
                        onPress={() => {
                            this.props.navigation.navigate('Detail'), {
                                text: 'Hello from screen 1'
                            }
                        }}
                    ><Text style={styles.leftHeaderText}>Отменить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.centerHeader}><Text style={styles.centerHeaderText}>Операция</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.rightHeader} onPress={this.appData}><Text style={styles.rightHeaderText}>Сохранить</Text></TouchableOpacity>
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

                        <View>
                            <MyDatePicker />
                        </View>

                        {/*<TextInput style={styles.listTitle_2} value={this.state.title} />*/}
                        <View style={styles.listTitle_3}>
                            {/*    <ModalForAccounts title={'Наличные'} selectField={'Центр'} callback={(data) => { }} />
                            <ModalForAccounts selectField='Центр' title={this.state.title}/>*/}
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}
                            >
                                <Text style={styles.listTitle_4}>{this.state.title}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.listTitle_3}>
                            <ModalExample title={'Выбрать категорию'} selectField={'Центр'} callback={(data) => { }} />
                        </View>
                        {/*  <Text style={styles.listTitle_2}
                        >{this.state.categories.filter(f => f.id === this.state.accounts[0].transactions[0].category)[0].title}</Text>*/}
                        <TextInput style={styles.listTitle_2} placeholder='Введите описание'
                        />
                        {!this.state.activeCenter ? <TextInput style={styles.listTitle_2} placeholder="Введите сумму" />
                            : <TextInput style={styles.listTitle_2_green} placeholder="Введите сумму" />}
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

const array = [

];

let list = {
    id: 2,
    title: "Тинькофф",
    balance: 500000,
    description: "bal",
    currency: 1,
    symbol: "руб",
    rate: 1,
    position: 0,
    date: 2578064113,
    transactions: [
        {
            "id": 4,
            "title": "Яндекс.Деньги",
            "amount": 34015,
            "description": "bla bla bla",
            "category": 2,
            "date": 1578098713
        }
    ]
};







const styles = StyleSheet.create({
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
    listTitle_4: {
        height: 50,
        paddingTop: 15,
        fontSize: 16,
        paddingLeft: 3
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

