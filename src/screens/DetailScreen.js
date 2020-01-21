import React from 'react';
import { Button, Text, Image, View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { light as lightTheme, mapping } from '@eva-design/eva';
import AsyncStorage from '@react-native-community/async-storage';
import accounts from "../data/accounts.json"
import categories from "../data/categories.json"
import Moment from 'react-moment';
import AddTransactionScreen from './AddTransactionScreen'

export class DetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: accounts,
            categories: categories

        }
        if (this.props.navigation.getParam('data')) {
            const newData = this.props.navigation.getParam('data')
            let val = this.state.accounts;
            val[newData.id].transactions.title = newData.title
            this.setState({
                accounts: val

            })
        }
    }

    timestampToDate(ts) {
        var d = new Date();
        d.setTime(ts * 1000);
        return ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear();
    }
    balanceSum_2(transactions) {
        var sum = 0;
        for (var i = 0; i < transactions.length; i++) {
            sum += transactions[i].amount
        }
        return sum / 100
    }




    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.leftHeader}
                        onPress={() => {
                            this.props.navigation.navigate('Home')
                        }}
                    ><Image source={require('../assets/image/back.png')} style={styles.back}
                        />
                        <Text style={styles.leftHeaderText}>Cчета</Text></TouchableOpacity>
                    <View style={styles.centerHeader}><Text style={styles.centerHeaderText}>{this.props.navigation.getParam('title')}</Text></View>
                </View>
                <FlatList
                    // data={this.state.accounts[0].transactions}
                    data={this.props.navigation.getParam('transactions')}
                    style={styles.list}

                    renderItem={({ item }) => (
                        <View
                            style={styles.listItem}
                        >

                            <TouchableOpacity
                                style={styles.firstColumnStyle}
                                onPress={() => {
                                    this.props.navigation.navigate('DeepDetail', {
                                        amount: item.amount,
                                        title: item.title,
                                        description: item.description,
                                        category: this.state.categories.filter(f => f.id === item.category)[0].title,
                                        date: this.timestampToDate(item.date),
                                    })
                                }}>
                                <View>
                                    <View style={styles.subFirstColumn}>
                                        <Moment format="DD.MM.YYYY"
                                            style={styles.listTitle} element={Text} unix>{item.date}</Moment>
                                        <Text style={styles.listTitle} numberOfLines={1}>{' ' + ' ' + '<' + item.title + '>'}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.listTitle_2}
                                        >{this.state.categories.filter(f => f.id === item.category)[0].title}</Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.secondColumnStyle}>
                                <View style={styles.subSecondColumn}>{item.amount / 100 >= 0 ? <View style={styles.thirdColumnStyle}>
                                    <Text style={styles.sumStyle}>{item.amount / 100 + " " + "₽"}</Text></View> :
                                    <View style={styles.thirdColumnStyle}><Text style={styles.sumStyle_2}>{Math.abs(item.amount) / 100 + " " + "₽"}
                                    </Text>
                                    </View>}
                                    <Image source={require('../assets/image/forward.png')} style={styles.forward} />
                                </View>
                                <View><Text style={styles.balance}>{this.props.navigation.getParam('balance') / 100 + " " + "₽"}
                                </Text>
                                </View>
                            </View>


                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()} />
                <View style={styles.keller}>
                    <Text style={styles.kellerText}>Текущий баланс {this.balanceSum_2(this.props.navigation.getParam('transactions')) + " " + "₽"}</Text>
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    leftHeader: {
        flexDirection: 'row',
        position: 'absolute',
        paddingTop: 20,
        paddingLeft: 10
    },
    back: {
        width: 20,
        height: 20,
        marginTop: 3,
        marginRight: 0,
        tintColor: 'dodgerblue',
    },
    leftHeaderText: {
        color: "dodgerblue",
        fontWeight: 'bold',
        fontSize: 18
    },
    centerHeader: {
        position: "relative",
        paddingLeft: 140,
    },
    centerHeaderText: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 18
    },
    listItem: {
        paddingTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 4,
        paddingHorizontal: 4,
        justifyContent: "space-between"

    },
    firstColumnStyle: {
        position: 'relative',
        top: 10,
        paddingTop: 10,
        alignSelf: "flex-start",
        paddingLeft: 15,
        width: 250
    },
    subFirstColumn: {
        flexDirection: 'row',
    },
    secondColumnStyle: {
        flexDirection: 'column',
        position: 'relative',
        alignSelf: "flex-start",
        paddingTop: 10,
        marginTop: 0,
    },
    subSecondColumn: {
        flexDirection: 'row'
    },
    sumStyle: {
        color: 'green',
        fontWeight: "bold",
        fontSize: 16
    },
    sumStyle_2: {
        color: 'red',
        fontWeight: "bold",
        fontSize: 16
    },
    forward: {
        width: 15,
        height: 15,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    balance: {
        paddingTop: 0,
        paddingRight: 35,
        alignSelf: 'flex-end',
        color: 'black',
        fontSize: 14,
        fontWeight: "bold",

    },
    listTitle: {
        fontSize: 16,
    },
    listTitle_2: {
        fontSize: 16,
        paddingTop: 12
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
    }
})


