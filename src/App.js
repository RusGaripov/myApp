import React from 'react';
import { ActivityIndicator } from 'react-native';

// plug-ins
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//screens
import { HomeScreen } from './screens/HomeScreen';
import { DetailScreen } from './screens/DetailScreen';
import { DeepDetailScreen } from './screens/DeepDetailScreen';
import { AddTransactionScreen } from './screens/AddTransactionScreen';

// helpers
import { Storage } from './helpers/Index';

const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
            },
        },
        Detail: {
            screen: DetailScreen,
            navigationOptions: {
                header: null,
            },
        },
        DeepDetail: {
            screen: DeepDetailScreen,
            navigationOptions: {
                header: null,
            },
        },
        AddTransaction: {
            screen: AddTransactionScreen,
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        initialRouteName: 'Home',
    },
);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            trans:null,
            loading: true
        }
    }
    componentDidMount = () => {
        Storage.get('categories', (categories) => {
            if (categories == null) {
                categories = [
                    {
                        "id": 1,
                        "parentId": 0,
                        "title": "Машина"
                    },
                    {
                        "id": 2,
                        "parentId": 1,
                        "title": "Бензин"
                    },
                    {
                        "id": 3,
                        "parentId": 1,
                        "title": "ТО"
                    },
                    {
                        "id": 4,
                        "parentId": 0,
                        "title": "Покупки"
                    },
                    {
                        "id": 5,
                        "parentId": 4,
                        "title": "Ашан"
                    },
                    {
                        "id": 6,
                        "parentId": 4,
                        "title": "Магнит"
                    }
                ];
                Storage.set('categories', JSON.stringify(categories))
            }
            this.setState({ loading: false });

        })
        Storage.get('data', (data) => {
            if (data == null) {
                data = [
                    {
                        "id": 1,
                        "title": "Наличные",
                        "balance": 0,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": []
                    },
                    {
                        "id": 2,
                        "title": "Тинькофф",
                        "balance": 0,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 2578064113,
                        "transactions": []
                    },
                    {
                        "id": 3,
                        "title": "Тинькофф Бизнес",
                        "balance": 0,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": []
                    },
                    {
                        "id": 4,
                        "title": "Сбербанк",
                        "balance": 0,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": []
                    },
                    {
                        "id": 5,
                        "title": "Яндекс.Деньги",
                        "balance": 0,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": []
                    },
                    {
                        "id": 6,
                        "title": "Альфа Банк",
                        "balance": 0,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": []
                    }
                ];
                Storage.set('data', JSON.stringify(data))
            }
            this.setState({ loading: false });

        })

        Storage.get('trans', (trans) => {
            if (trans == null) {
                trans = [
                    {
                        "id": 0,
                        "infoDebtor": [
                            {
                                "accountId": 0,
                                "transId": 0,
                            }

                        ],
                        "infoCreditor": [
                            {
                                "accountId": 0,
                                "transId": 0,
                            }

                        ]
                    }
                  

                ];
                Storage.set('trans', JSON.stringify(trans))
            }
            this.setState({ loading: false });

        })
    }
    render() {
        const AppContainer = createAppContainer(RootStack);
        return this.state.loading ? <ActivityIndicator /> : <AppContainer />
    }
}