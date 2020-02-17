import React from 'react';
import { Text, Image, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Moment from 'react-moment';
import { Utils, Storage } from '../helpers/Index'
import AsyncStorage from '@react-native-community/async-storage'
import { AddTransactionScreen } from './AddTransactionScreen';



export class DetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.navigation.getParam('categories'),
            data: this.props.navigation.getParam('data'),
            loading: true,
            datam: this.props.navigation.getParam('transactions'),
            description: this.props.navigation.getParam('description'),
            // category: this.props.navigation.getParam('category'),
            title: this.props.navigation.getParam('title'),
            id: this.props.navigation.getParam('id'),
            balance: this.props.navigation.getParam('balance'),
        }

    }
    componentDidMount() {
//this.joinData()
        this.setState({
            loading: false,

        })

    }




    saveInfo_2 = () => {
        let o = this.state.datam.length
        let obj_2 = {
            balance: Utils.balanceSum_3(this.props.navigation.getParam('transactions'))[o - 1],
            id: this.state.data.id,
            title: this.state.title
        }
        let y = parseInt(this.state.balance / 100)
        AsyncStorage.setItem('counter', JSON.stringify(obj_2));


    }


    displayInfo_3 = async () => {
        try {
            let adder = await AsyncStorage.getItem('adder')
            let parsed = JSON.parse(adder)
            //  this.state.datam.push(parsed.title)
            alert(parsed.title)
        }
        catch (error) {
            alert(error)
        }
    }

    joinData = async (title) => {
        try {
            let adder = await AsyncStorage.getItem('adder')
            let parsed = JSON.parse(adder)
            var myDate = parsed.date.toString();     // date
            myDate = myDate.split("-");
            var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
            parsed.date = new Date(newDate).getTime() / 1000
            parsed.amount = parseInt(parsed.amount, 10);

            this.state.datam.push({ title: parsed.title, date: parsed.date, amount: parsed.amount, category: parsed.category, description: parsed.description, id: this.state.datam.length + 1 })
            this.setState({
                datam: [...this.state.datam],
            })
        }
        catch (error) {
            alert(error)
        }
    }


    displayInfo_2 = async () => {
        try {
            let counter = await AsyncStorage.getItem('counter')
            let parsed = JSON.parse(counter)
            let o = this.state.datam.length
        }
        catch (error) {
            alert(error)
        }
    }

    displayInfo = async (data) => {
        try {
            let data = await AsyncStorage.getItem('data')
            let trans = await AsyncStorage.getItem('trans')
            let parsed = JSON.parse(trans)
            let p = parsed.id - 1
            this.state.datam[p].title = parsed.title
            this.state.datam[p].amount = parseFloat(parsed.amount, 10) * 100;
            this.state.datam[p].description = parsed.description
            this.state.datam[p].category = parsed.category
            var myDate = parsed.date.toString();     // date
            myDate = myDate.split("-");
            var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
            this.state.datam[p].date = new Date(newDate).getTime() / 1000

            this.setState({
                // data: JSON.parse(data),
                title: parsed.title,
                amount: parseFloat(parsed.amount, 10) * 100
            })
        }
        catch (error) {
            alert(error)
        }
    }

    render() {
        this.displayInfo()
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
                    ><Text style={styles.centerHeaderText}>{this.props.navigation.getParam('title')}</Text></View>
                </View>


                <FlatList
                    data={this.props.navigation.getParam('transactions')}
                    extraData={this.state.datam}
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
                                        id: item.id,
                                        categories: this.props.navigation.getParam('categories'),
                                        description: item.description,
                                        // category: typeof item.category=='string' ? item.category : item.category,
                                        // category:item.category,
                                        // category: this.state.categories.filter(f => f.id === item.category)[0].title,
                                        category: this.state.categories.filter(f => f.id === item.category)[0].id,
                                        date: Utils.timestampToDate(item.date)
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

                                            {/*      {typeof item.category=='string' ? item.category:item.category}   </Text>}      */}

                                            {this.state.categories.filter(f => f.id === item.category)[0].title}   </Text>}

                                        {/*  {item.category} </Text>}*/}

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
                                    {/*  {Math.round(this.props.navigation.getParam('balance') / 100 + item.amount / 100)
                                        + " " + "₽"}*/}
                                    {Utils.balanceSum_3(this.props.navigation.getParam('transactions'))[item.id - 1] + " " + "₽"}

                                </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()} />

                <View style={styles.keller}>
                    <Text style={styles.kellerText}>Текущий баланс {Utils.balanceSum_3(this.props.navigation.getParam('transactions'))[this.state.datam.length - 1] + " " + "₽"} </Text>

                    {/*    <Text style={styles.kellerText}>Текущий баланс {Utils.balanceSum_2(this.props.navigation.getParam('transactions')) +
                        this.props.navigation.getParam('balance') / 100 + " " + "₽"}</Text>*/}
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