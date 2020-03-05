import React from 'react';
import { Text, Image, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Moment from 'react-moment';
import { Utils, Storage } from '../helpers/Index'
import AsyncStorage from '@react-native-community/async-storage'


export class DetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.navigation.getParam('categories'),
            data: null,
            loading: true,
            id: this.props.navigation.getParam('id'),
        }
    }


    componentDidMount() {
        Storage.get('data', (data) => {
            this.setState({
                loading: false,
                data: JSON.parse(data),
            })
        })
    }

    saveInfo_2 = async () => {
        var o;
        for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.title == this.state.data[i].title)
                o = i
        }
        if (this.state.data != null) {
            let o = this.state.data[this.state.id - 1].transactions.length
            this.state.data[this.state.id - 1].balance = Utils.balanceSum_3(this.state.data[this.state.id - 1].transactions)[this.state.data[this.state.id - 1].transactions.length - 1] * 100
            this.state.data[o].balance = Utils.balanceSum_3(this.state.data[o].transactions)[this.state.data[o].transactions.length - 1] * 100
            AsyncStorage.setItem('data', JSON.stringify(this.state.data));
        }
    }

    onFocusFunction = () => {
        Storage.get('data', (data) => {
            this.setState({
                loading: false,
                data: JSON.parse(data),
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

    render() {

        this.saveInfo_2()

        if (this.state.loading)
            return <ActivityIndicator />
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


                    <View style={styles.centerHeader}
                    ><Text style={styles.centerHeaderText}>{this.state.title}</Text></View>
                </View>

                <FlatList
                    data={this.state.data[this.state.id - 1].transactions}
                    style={styles.list}
                    renderItem={({ item }) => (
                        <View
                            style={styles.listItem}
                        >

                            <TouchableOpacity
                                style={styles.firstColumnStyle}
                                onPress={() => {
                                    this.props.navigation.navigate('DeepDetail', {
                                        id_home: this.state.id,
                                        id: item.id,
                                        categories: this.state.categories,
                                        category: this.state.categories.filter(f => f.id === item.category)[0].id,
                                    })
                                }}>

                                <View>
                                    <View style={styles.subFirstColumn}>
                                        <Moment format="DD.MM.YYYY"
                                            style={styles.listTitle} element={Text} unix>{item.date}</Moment>
                                        <Text style={styles.listTitle} numberOfLines={1}>{' ' + ' ' + '<' + item.title + '>'}</Text>
                                    </View>

                                    <View>
                                        {<Text style={styles.listTitle_2} >
                                            {this.state.categories.filter(f => f.id === item.category)[0].title}   </Text>}
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
                                <View><Text style={styles.balance}>
                                    {Utils.balanceSum_3(this.state.data[this.state.id - 1].transactions)[item.id - 1] + " " + "₽"}

                                </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()} />

                <View style={styles.keller}>
                    <Text style={styles.kellerText}>Текущий баланс {Utils.balanceSum_3(this.state.data[this.state.id - 1].transactions)[this.state.data[this.state.id - 1].transactions.length - 1] + " " + "₽"} </Text>
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