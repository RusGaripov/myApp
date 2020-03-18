import React from 'react';
import { Modal, Text, View, TextInput, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import ModalExample from '../components/Picker';
import DatePicker from 'react-native-datepicker'
import { Storage, Utils } from '../helpers/Index'
import AsyncStorage from '@react-native-community/async-storage'


export class AddTransactionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.navigation.getParam('categories'),
            id: this.props.navigation.getParam('id'),
            category: null,
            description: '',
            amount: null,
            text_2: this.props.navigation.getParam('description'),
            text: Math.abs(this.props.navigation.getParam('amount') / 100) + ' ' + "₽",
            title: 'Выберите счет',
            data: null,
            trans: null,
            activeLeft: true,
            activeCenter: false,
            activeRight: false,
            selectField: 'Справа',
            modalVisible: false,
        }
    }

    componentDidMount() {

        Storage.get('data', (data) => {
            const parsedData = JSON.parse(data)
            this.setState({
                loading: false,
                data: JSON.parse(data),
            })
        })

        Storage.get('trans', (trans) => {
            this.setState({
                loading: false,
                trans: JSON.parse(trans),
            })
        })

    }


    addItemQuantity = (title, id, account) => { // колбэк для пикера 
        this.setState({
            category: title
        })

    };


    saveInfo_3 = async () => {
        this.goToDetail()
        var myDate = this.state.date.toString().split("-");     // преобразование времени
        var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
        this.state.date = new Date(newDate).getTime() / 1000

        var o;
        for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.title == this.state.data[i].title)
                o = i
        }
        let u = this.state.data[this.state.id - 1].transactions.length



        {
            this.state.activeLeft === true ?
                this.state.trans.push({
                    id: this.state.trans.length + 1, infoDebtor: { accountId: this.state.id, transId: this.state.data[this.state.id - 1].transactions.length + 1 },
                    infoCreditor: { accountId: o + 1, transId: this.state.data[o].transactions.length + 1 }
                })
                :
                this.state.trans.push({
                    id: this.state.trans.length + 1, infoDebtor: { accountId: o + 1, transId: this.state.data[o].transactions.length + 1 },
                    infoCreditor: { accountId: this.state.id, transId: this.state.data[this.state.id - 1].transactions.length + 1 }
                })
        }


        {
            this.state.activeLeft === true ?
                this.state.data[this.state.id - 1].transactions.push({
                    id: this.state.data[this.state.id - 1].transactions.length + 1, transactionId: this.state.trans.length, status: "debtor", title: this.state.title, date: this.state.date,
                    amount: -parseInt(this.state.text), category: this.state.category, description: this.state.text_2
                }) &&
                this.state.data[o].transactions.push({
                    id: this.state.data[o].transactions.length + 1, transactionId: this.state.trans.length, status: "creditor", title:this.state.data[this.state.id - 1].title , date: this.state.date,
                    amount: parseInt(this.state.text), category: this.state.category, description: this.state.text_2
                })
                &&
                (this.state.data[this.state.id - 1].balance = Utils.balanceSum_3(this.state.data[this.state.id - 1].transactions)[u] * 100)
                &&
                (this.state.data[o].balance = Utils.balanceSum_3(this.state.data[o].transactions)[this.state.data[o].transactions.length - 1] * 100)
                :
                this.state.data[this.state.id - 1].transactions.push({
                    id: this.state.data[this.state.id - 1].transactions.length + 1, transactionId: this.state.trans.length, status: "creditor", title: this.state.title, date: this.state.date,
                    amount: parseInt(this.state.text), category: this.state.category, description: this.state.text_2
                }) &&
                this.state.data[o].transactions.push({
                    id: this.state.data[o].transactions.length + 1, transactionId: this.state.trans.length, status: "debtor", title: this.state.title, date: this.state.date,
                    amount: -parseInt(this.state.text), category: this.state.category, description: this.state.text_2
                }) 
                //&&
             //   (this.state.data[this.state.id - 1].balance = Utils.balanceSum_3(this.state.data[this.state.id - 1].transactions)[u - 1] * 100)
                &&
                (this.state.data[this.state.id - 1].balance = Utils.balanceSum_3(this.state.data[this.state.id - 1].transactions)[u] * 100)
                &&
                (this.state.data[o].balance = Utils.balanceSum_3(this.state.data[o].transactions)[this.state.data[o].transactions.length - 1] * 100)
        }
        AsyncStorage.setItem('data', JSON.stringify(this.state.data));
        AsyncStorage.setItem('trans', JSON.stringify(this.state.trans));
    }



    onFocusFunction = () => {
        Storage.get('data', (data) => {
            this.setState({
                loading: false,
                data: JSON.parse(data),
            })
        })

        Storage.get('categories', (data) => {

            this.setState({
                loading: false,
                categories: JSON.parse(data),
            })
        })
        Storage.get('trans', (trans) => {
            this.setState({
                loading: false,
                trans: JSON.parse(trans),
            })
        })
    }

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction()
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    goToDetail = () => {
        this.props.navigation.navigate('Detail', {
            data: this.state.data,
            categories: this.state.categories,
            id: this.state.id,
        })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    _onPress(account) {
        this.setState({ title: account.title, selectedItemId: account.id });
        this.setModalVisible(!this.state.modalVisible);
    }




    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.leftHeader}
                        onPress={() => {
                            this.props.navigation.navigate('Home')
                        }}
                    ><Text style={styles.leftHeaderText}>Отменить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.centerHeader}
                        onPress={() => {
                            this.props.navigation.navigate('Detail', {
                                data: this.state.data,
                                categories: this.state.categories,
                                id: this.state.id,
                            })
                        }}

                    ><Text style={styles.centerHeaderText}>Операция</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={styles.rightHeader} onPress={this.saveInfo_3}><Text style={styles.rightHeaderText}>Сохранить</Text></TouchableOpacity>
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

                        <Text style={styles.rightMenuText}>Перевод</Text>
                    </TouchableOpacity>

                        : <TouchableOpacity style={styles.rightMenu_2}
                            onPress={() => {
                                this.setModalVisible(true);
                            }}
                        >
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
                        <DatePicker
                            style={styles.datepicker}
                            date={this.state.date}
                            mode="datetime"
                            showIcon={false}
                            placeholder="Выберите дату"
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
                                        marginLeft: 0,
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
                                        marginTop: -3,
                                        marginLeft: -50
                                    },
                                    placeholderText: {
                                        fontSize: 17,
                                        marginLeft: -22

                                    }
                                }
                            }
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <View style={styles.listTitle_3}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}
                            >
                                <Text style={styles.listTitle_4}>{this.state.title}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.listTitle_3}>
                            <ModalExample category={this.state.account} title={'Выбрать категорию'} selectField={'Центр'} addItemQuantityPress={this.addItemQuantity} />
                        </View>
                        <TextInput style={styles.listTitle_2} placeholder='Введите описание'
                            onChangeText={(text_2) => this.setState({ text_2 })}
                        />
                        {!this.state.activeCenter ? <TextInput style={styles.listTitle_2} placeholder="Введите сумму"
                            onChangeText={(text) => this.setState({ text })} />
                            : <TextInput style={styles.listTitle_2_green} placeholder="Введите сумму"
                                onChangeText={(text) => this.setState({ text })} />}
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
        paddingTop: 8,
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
    },


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