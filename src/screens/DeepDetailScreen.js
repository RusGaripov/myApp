import React from 'react';
import { Modal, Text, View, TextInput, StyleSheet, Image, FlatList, TouchableOpacity, TouchableHighlightBase } from 'react-native';
import ModalExample from '../components/Picker';
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-community/async-storage'
import { Utils, Storage } from '../helpers/Index'

export class DeepDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            categories: this.props.navigation.getParam('categories'),
            category: null,
            id: this.props.navigation.getParam('id'),
            id_home: this.props.navigation.getParam('id_home'),
            data: null,
            trans: null,
            activeLeft: true,
            activeCenter: false,
            activeRight: false,
            selectField: 'Справа',
            modalVisible: false,
            o: null,
            accountId: null
        }
    }

    componentDidMount() {
        Storage.get('trans', (trans) => {
            this.setState({
                loading: false,
                trans: JSON.parse(trans),
            })
        })
        Storage.get('data', (data) => {
            const parsedData = JSON.parse(data)
            this.setState({
                data: JSON.parse(data),
                loading: false,
                title: parsedData[this.state.id_home - 1].transactions[this.state.id - 1].title,
                date: Utils.timestampToDate(parsedData[this.state.id_home - 1].transactions[this.state.id - 1].date),
                description: parsedData[this.state.id_home - 1].transactions[this.state.id - 1].description,
                category: parsedData[this.state.id_home - 1].transactions[this.state.id - 1].category,
                amount: parsedData[this.state.id_home - 1].transactions[this.state.id - 1].amount,
                //  amount:Math.abs(parsedData[this.state.id_home - 1].transactions[this.state.id - 1].amount / 100) + ' ' + "₽",
                text: Math.abs(parsedData[this.state.id_home - 1].transactions[this.state.id - 1].amount / 100) + ' ' + "₽",
                text_2: parsedData[this.state.id_home - 1].transactions[this.state.id - 1].description,
                status: parsedData[this.state.id_home - 1].transactions[this.state.id - 1].status,
                activeLeft: parsedData[this.state.id_home - 1].transactions[this.state.id - 1].status == "debtor" ? true : false,
                activeCenter: parsedData[this.state.id_home - 1].transactions[this.state.id - 1].status == "creditor" ? true : false,
            })
        })


    }






    addItemQuantity = (title, id, account) => { //колбэк для пикера
        this.setState({
            category: title
        })

    };

    saveInfo = async () => {
        console.log(this.state.trans, this.state.data)
        const { title, balance, id, date, category, description, activeLeft, text, text_2, amount, categories, data } = this.state
        var myDate = this.state.date.toString().split("-");     //  преобразование даты
        var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
        this.state.date = new Date(newDate).getTime() / 1000

        var o;
        for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.title == this.state.data[i].title)
                o = i
        }

        if (this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].title == this.state.title) {

            if (this.state.activeLeft === true && this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "creditor") {
                alert('первый вар')
                this.state.data[this.state.id_home - 1].transactions[this.state.id - 1] = ({
                    id: id, title: title,
                    status: "debtor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    amount: -1 * parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })


                var u;
                for (var i = 0; i < this.state.data[o].transactions.length; i++) {
                    if (this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId == this.state.data[o].transactions[i].transactionId)
                        u = i
                }
                console.log(o, u)


                this.state.data[o].transactions[u]
                    = ({
                        id: u + 1,
                        status: "creditor",
                        transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                        title: this.state.data[this.state.id_home - 1].title,
                        amount: parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                    })

                this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.accountId = this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoCreditor.accountId
                this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.transId = this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoCreditor.transId


                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId = o + 1
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId = u + 1






            }
            else if (this.state.activeLeft === true && this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "debtor") {
                alert('полуторный вар')
                this.state.data[this.state.id_home - 1].transactions[this.state.id - 1] = ({
                    id: id, title: title,
                    status: "debtor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    amount: -1 * parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })


                var u;
                for (var i = 0; i < this.state.data[o].transactions.length; i++) {
                    if (this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId == this.state.data[o].transactions[i].transactionId)
                        u = i
                }
                console.log(o, u)


                this.state.data[o].transactions[u]
                    = ({
                        id: u + 1,

                        status: "creditor",
                        transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                        title: this.state.data[this.state.id_home - 1].title,
                        amount: parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                    })

                //    this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.accountId = this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.accountId
                //     this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.transId = this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.transId


                //   this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId = o + 1
                //   this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId = u + 1






            }






            else if (this.state.activeCenter === true && this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "debtor") {
                alert('второй вар')
                this.state.data[this.state.id_home - 1].transactions[this.state.id - 1] = ({
                    id: id, title: title,
                    status: "creditor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    amount: parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })


                var u;
                for (var i = 0; i < this.state.data[o].transactions.length; i++) {
                    if (this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId == this.state.data[o].transactions[i].transactionId)
                        u = i
                }




                this.state.data[o].transactions[u]
                    = ({
                        id: u + 1,
                        status: "debtor",
                        transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                        title: this.state.data[this.state.id_home - 1].title,
                        amount: (-1) * parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                    })

                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId = this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId = this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId


                this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.accountId = o + 1
                this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.transId = u + 1



            }


            else if (this.state.activeCenter === true && this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "creditor") {
                alert('два с половиной вар')
                this.state.data[this.state.id_home - 1].transactions[this.state.id - 1] = ({
                    id: id, title: title,
                    status: "creditor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    amount: parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })


                var u;
                for (var i = 0; i < this.state.data[o].transactions.length; i++) {
                    if (this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId == this.state.data[o].transactions[i].transactionId)
                        u = i
                }




                this.state.data[o].transactions[u]
                    = ({
                        id: u + 1,
                        status: "debtor",
                        transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                        title: this.state.data[this.state.id_home - 1].title,
                        amount: (-1) * parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                    })

                //    this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId = this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId
                //   this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId = this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId


                //     this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.accountId = o + 1
                //     this.state.trans[this.state.data[o].transactions[u].transactionId - 1].infoDebtor.transId = u + 1



            }

            else {
                return alert('ho')
            }
        }




        else {
            if (this.state.activeLeft === true && this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "debtor") {
                alert('5 вар')

                this.state.data[this.state.id_home - 1].transactions[this.state.id - 1] = ({
                    id: id, title: title,
                    status: "debtor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    amount: -1 * parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })



                var o;
                for (var i = 0; i < this.state.data.length; i++) {
                    if (this.state.title == this.state.data[i].title)
                        o = i
                }

                this.state.data[this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId - 1].transactions.splice(this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId - 1, 1)// почему не .transId-1 ???
                // ключевая разница между 5 и 6 вариантом сверху

                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId = this.state.id_home
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId = this.state.id
                console.log(this.state.id_home, this.state.id)


                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId = o + 1
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId = this.state.data[o].transactions.length + 1
                console.log(o, this.state.data[o].transactions.length)


                this.state.data[o].transactions.push({
                    id: this.state.data[o].transactions.length + 1,
                    status: "creditor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    title: this.state.data[this.state.id_home - 1].title,
                    amount: parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })





                AsyncStorage.setItem('trans', JSON.stringify(this.state.trans));//нужно ли ?

            }

            else if (this.state.activeLeft === true && this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "creditor") {
                alert('6 вар')

                this.state.data[this.state.id_home - 1].transactions[this.state.id - 1] = ({
                    id: id, title: title,
                    status: "debtor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    amount: -1 * parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })



                var o;
                for (var i = 0; i < this.state.data.length; i++) {
                    if (this.state.title == this.state.data[i].title)
                        o = i
                }

                this.state.data[this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId - 1].transactions.splice(this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId - 1, 1)// почему не .transId-1 ???


                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId = this.state.id_home
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId = this.state.id
                console.log(this.state.id_home, this.state.id)


                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId = o + 1
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId = this.state.data[o].transactions.length + 1
                console.log(o, this.state.data[o].transactions.length)


                this.state.data[o].transactions.push({
                    id: this.state.data[o].transactions.length + 1,
                    status: "creditor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    title: this.state.data[this.state.id_home - 1].title,
                    amount: parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })





                AsyncStorage.setItem('trans', JSON.stringify(this.state.trans));//нужно ли ?

            }




            else if (this.state.activeCenter === true && this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "debtor") {
                alert('7 вар')
                console.log(this.state.data, this.state.trans)
                this.state.data[this.state.id_home - 1].transactions[this.state.id - 1] = ({
                    id: id,
                    title: title,
                    //  status: "debtor",
                    status: "creditor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    amount: parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })


                this.state.data[this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId - 1].transactions.splice(this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId - 1, 1)// почему не .transId-1 ???
                console.log(this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId - 1)
                console.log(this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId - 1)

                var o;
                for (var i = 0; i < this.state.data.length; i++) {
                    if (this.state.title == this.state.data[i].title)
                        o = i
                }




                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId = this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId = this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId = o + 1
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId = this.state.data[o].transactions.length + 1




                this.state.data[o].transactions.push({
                    id: this.state.data[o].transactions.length + 1,
                    status: "debtor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    title: this.state.data[this.state.id_home - 1].title,
                    amount: -1 * parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })
                AsyncStorage.setItem('trans', JSON.stringify(this.state.trans));//нужно ли ?
                AsyncStorage.setItem('data', JSON.stringify(this.state.data));

            }

            else if (this.state.activeCenter === true && this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "creditor") {
                alert('8 вар')
                console.log(this.state.data, this.state.trans)
                this.state.data[this.state.id_home - 1].transactions[this.state.id - 1] = ({
                    id: id, title: title,
                    //  status: "debtor",
                    status: "creditor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    amount: parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })


                this.state.data[this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId - 1].transactions.splice(this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId - 1, 1)// почему не .transId-1 ???


                var o;
                for (var i = 0; i < this.state.data.length; i++) {
                    if (this.state.title == this.state.data[i].title)
                        o = i
                }




                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.accountId = this.state.id_home
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoCreditor.transId = this.state.id
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.accountId = o + 1
                this.state.trans[this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId - 1].infoDebtor.transId = this.state.data[o].transactions.length + 1




                this.state.data[o].transactions.push({
                    id: this.state.data[o].transactions.length + 1,
                    status: "debtor",
                    transactionId: this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].transactionId,
                    title: this.state.data[this.state.id_home - 1].title,
                    amount: -1 * parseFloat(text) * 100, description: text_2, category: category, date: this.state.date, categories: categories,
                })
                AsyncStorage.setItem('trans', JSON.stringify(this.state.trans));//нужно ли ?
                AsyncStorage.setItem('data', JSON.stringify(this.state.data));

            }


            else {
                alert('ho-ho')
            }

        }

        AsyncStorage.setItem('data', JSON.stringify(data));
        AsyncStorage.setItem('trans', JSON.stringify(this.state.trans));//нужно ли ?

        this.props.navigation.navigate('Detail'), {
            trans: this.state.trans,
            data: this.state.data
        }
    }




    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    _onPress(account) {
        this.setState({ title: account.title, selectedItemId: account.id, amount: this.state.text });
        this.setModalVisible(!this.state.modalVisible);
    }




    /* activator = async () => {
         if (this.state.data[this.state.id_home - 1].transactions[this.state.id - 1].status == "debtor") {
             this.setState({
                 activeLeft: true,
                 activeCenter: false
             })
 
         }
         else {
 
             this.setState({
                 activeLeft: false,
                 activeCenter: true
             })
         }
         console.log(this.state.activeLeft, this.state.activeCenter)
     }*/




    render() {
        //   this.activator()
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.leftHeader}
                        onPress={() => {
                            this.props.navigation.navigate('Detail'), {
                                trans: this.state.trans
                            }
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
                                <Text style={styles.listTitle_2}>{this.state.title}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.listTitle_3}>
                            {this.state.category != null ? <ModalExample
                                title={this.state.categories[this.state.category - 1].title} selectField={'Центр'} addItemQuantityPress={this.addItemQuantity} /> : null}
                        </View>
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