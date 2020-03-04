import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Storage, Utils } from '../helpers/Index';
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationEvents } from 'react-navigation';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            categories: null,
<<<<<<< HEAD
            category: null,
        }

    }

    componentDidMount() {

        Storage.get('data', (data) => {
            // alert(data.transactions[0].category)
            this.setState({
                loading: false,
                data: JSON.parse(data),
                //  category:JSON.parse(category)
            })
        })

        Storage.get('categories', (data) => {
=======
            category: null
        }

    }
>>>>>>> a7619bef02cdcd384aae625edcc8f43c2ae7b858

            this.setState({
                loading: false,
                categories: JSON.parse(data),
            })
        })
    }


    onFocusFunction = () => {
        // do some stuff on every screen focus
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
    }

    // add a focus listener onDidMount
    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction()
        })
        //    console.log(4, this.state.data[0].transactions)
    }

    // and don't forget to remove the listener
    componentWillUnmount() {
        this.focusListener.remove()
    }

<<<<<<< HEAD

=======
>>>>>>> a7619bef02cdcd384aae625edcc8f43c2ae7b858
    displayInfo_2 = async () => {
        try {
            let counter = await AsyncStorage.getItem('counter')
            let parsed = JSON.parse(counter)
            let p = parsed.id - 1
            this.state.data[p].balance = Math.round(parsed.balance) * 100,

                this.setState({
<<<<<<< HEAD
                    //   data: JSON.parse(data),
=======
>>>>>>> a7619bef02cdcd384aae625edcc8f43c2ae7b858
                    balance: parsed.balance,
                })
        }
        catch (error) {
<<<<<<< HEAD
            // alert(error)
=======
            alert(error)
>>>>>>> a7619bef02cdcd384aae625edcc8f43c2ae7b858
        }
    }



    render() {
<<<<<<< HEAD
        //   this.displayInfo_2()
=======
        this.displayInfo_2()
>>>>>>> a7619bef02cdcd384aae625edcc8f43c2ae7b858

        if (this.state.loading)
            return <ActivityIndicator />
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <NavigationEvents onDidFocus={() => console.log('I am triggered')} />
                    <TouchableOpacity style={styles.leftHeader}><Text style={styles.leftHeaderText}>Править</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.centerHeader}
                        onPress={this.displayInfo_2} ><Text style={styles.centerHeaderText}>Счета</Text></TouchableOpacity>

                </View>
                <FlatList
                    data={this.state.data}

                    renderItem={({ item }) => (
                        <View
                            style={styles.listItem}
                        >
                            <View style={styles.firstColumnStyle} >
                                <Text style={styles.listTitle}
                                    onPress={() => {
                                        this.props.navigation.navigate('Detail', {
<<<<<<< HEAD
                                            categories: this.state.categories,
                                           // id: this.state.data[item.id - 1].id,
                                             id: item.id,
                                             data: item
=======
                                            data: item,
                                            amount: item.amount,
                                            title: item.title,
                                            categories: this.state.categories,
                                            description: item.description,
                                            transactions: item.transactions,
                                            balance: item.balance,
                                            id: item.id
>>>>>>> a7619bef02cdcd384aae625edcc8f43c2ae7b858
                                        })
                                        console.log(1, this.state.data[item.id - 1].id, item.id)
                                    }}
                                >{item.title}</Text>
                            </View>
                            <View style={styles.secondColumnStyle}>
                                {item.balance / 100 >= 0 ? <View style={styles.thirdColumnStyle}><Text style={styles.sumStyle}>{item.balance / 100 + " " + "₽"}</Text></View>
                                    : <View style={styles.thirdColumnStyle}><Text style={styles.sumStyle_2}>{Math.abs(item.balance / 100) + " " + "₽"}</Text>
                                    </View>}
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('AddTransaction', {
                                            data: item,
<<<<<<< HEAD
                                            categories: this.state.categories,
                                          //  id: item.id
                                          id: this.state.data[item.id - 1].id,
                                        })
                                   //     console.log(item)

=======
                                            amount: item.amount,
                                            title: item.title,
                                            categories: this.state.categories,
                                            description: item.description,
                                            transactions: item.transactions,
                                            balance: item.balance,
                                            id: item.id
                                        })
>>>>>>> a7619bef02cdcd384aae625edcc8f43c2ae7b858
                                    }}>

                                    <Image source={require('../assets/image/adder.png')} style={styles.plus}
                                    /></TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()} />
                <View style={styles.keller}>
                    <Text style={styles.kellerText}>Текущий баланс {Utils.balanceSum(this.state.data) + " " + "₽"}</Text>
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