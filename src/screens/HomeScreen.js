import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import accounts from "../data/accounts.json"
import { Button } from 'react-native-ui-kitten';
import Storage from '../assets/storage/Storage'


export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: accounts,
        }
    }

    balanceSum(accounts) {
        var sum = 0;
        for (var i = 0; i < accounts.length; i++) {
            sum += accounts[i].balance
        }
        return sum / 100
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.leftHeader}><Text style={styles.leftHeaderText}>Править</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.centerHeader}><Text style={styles.centerHeaderText}>Счета</Text></TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.accounts}

                    renderItem={({ item }) => (
                        <View
                            style={styles.listItem}
                        >
                            <View style={styles.firstColumnStyle} >
                                <Text style={styles.listTitle}
                                    onPress={() => {
                                        this.props.navigation.navigate('Detail', {
                                            data: item,
                                            amount: item.amount,
                                            title: item.title,
                                            description: item.description,
                                            transactions: item.transactions,
                                            balance: item.balance,
                                            title:item.title
                                        })
                                    }}
                                >{item.title}</Text>
                            </View>
                            <View style={styles.secondColumnStyle}>
                                {item.balance / 100 >= 0 ? <View style={styles.thirdColumnStyle}><Text style={styles.sumStyle}>{item.balance / 100 + " " + "₽"}</Text></View>
                                    : <View style={styles.thirdColumnStyle}><Text style={styles.sumStyle_2}>{Math.abs(item.balance / 100) + " " + "₽"}</Text>
                                    </View>}
                                <TouchableOpacity
                                    //    style={styles.secondColumnStyle}
                                    onPress={() => {
                                        this.props.navigation.navigate('AddTransaction')
                                    }}>

                                    <Image source={require('../assets/image/adder.png')} style={styles.plus}
                                    /></TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()} />
                <View style={styles.keller}>
                    <Text style={styles.kellerText}>Текущий баланс {this.balanceSum(this.state.accounts) + " " + "₽"}</Text>
                </View>
            </View>

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

    },
    leftHeaderText: {
        color: "dodgerblue",
        fontWeight: 'bold',
        fontSize: 18
    },
    centerHeader: {
        paddingLeft: 80
    },
    centerHeaderText: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 18
    },


    headtext: {
        paddingTop: 3,
        paddingLeft: 5,
        fontWeight: "bold"
    },

    listItem: {
        height: 60,
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 4,
        paddingHorizontal: 4,
        justifyContent: "space-between",
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
    },
    firstColumnStyle: {
        position: 'relative',
        paddingTop: 10,
        alignSelf: "flex-end",
        marginBottom: 10
    },
    thirdColumnStyle: {
        alignItems: 'flex-end',
        paddingRight: 25,
        position: 'relative',
        width: 100,

    },
    sumStyle: {
        color: 'green',
        fontWeight: "bold"
    },
    sumStyle_2: {
        color: 'red'
    },
    secondColumnStyle: {
        alignSelf: "flex-end",
        marginBottom: 8,
        flexDirection: "row"

    },

    listTitle: {
        fontSize: 16,
    },
    plus: {
        marginTop: 0,
        width: 20,
        height: 20,
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
    title: {
        textAlign: 'center',
        marginVertical: 8
    }
});
