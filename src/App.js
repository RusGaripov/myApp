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
                        "balance": 200000,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": [
                            {
                                "id": 1,
                                "title": "Тинькофф",
                                "amount": 12399,
                                "description": "Командировка",
                                "category": 2,
                                "date": 1578064159
                            },
                            {
                                "id": 2,
                                "title": "Тинькофф Бизнес",
                                "amount": -14568,
                                "description": "расходы на шутовские затеи",
                                "category": 3,
                                "date": 1518064159
                            },
                            {
                                "id": 3,
                                "title": "Сбербанк",
                                "amount": 10835,
                                "description": "волшебные товары",
                                "category": 1,
                                "date": 1478064159
                            },
                            {
                                "id": 4,
                                "title": "Яндекс.Деньги",
                                "amount": 34015,
                                "description": "поход по платным музеям Парижа",
                                "category": 2,
                                "date": 1428098713
                            },
                            {
                                "id": 5,
                                "title": "Альфа Банк",
                                "amount": 34594,
                                "description": "елочные игрушки",
                                "category": 5,
                                "date": 1418064113
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "title": "Тинькофф",
                        "balance": 500000,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 2578064113,
                        "transactions": [
                            {
                                "id": 1,
                                "title": "Яндекс.Деньги",
                                "amount": 19399,
                                "description": "дружеский обед",
                                "category": 4,
                                "date": 1678064159
                            },
                            {
                                "id": 2,
                                "title": "Сбербанк",
                                "amount": -18568,
                                "description": "расходы на батон",
                                "category": 4,
                                "date": 1418064159
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "title": "Тинькофф Бизнес",
                        "balance": 500256,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": [
                            {
                                "id": 1,
                                "title": "Альфа Банк",
                                "amount": 219399,
                                "description": "купил лыжи",
                                "category": 4,
                                "date": 978064159
                            },
                            {
                                "id": 2,
                                "title": "Сбербанк",
                                "amount": -318568,
                                "description": "руль с усилителем",
                                "category": 1,
                                "date": 1018064159
                            }

                        ]
                    },
                    {
                        "id": 4,
                        "title": "Сбербанк",
                        "balance": 500000,
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
                        "balance": 300000,
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
                        "balance": 50000,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": []
                    },
                    {
                        "id": 7,
                        "title": "Счет 7",
                        "balance": 5000,
                        "description": "bal",
                        "currency": 1,
                        "symbol": "руб",
                        "rate": 1,
                        "position": 0,
                        "date": 1578064113,
                        "transactions": []
                    },
                    {
                        "id": 8,
                        "title": "Счет 8",
                        "balance": 80000,
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
    }
    render() {
        const AppContainer = createAppContainer(RootStack);
        return this.state.loading ? <ActivityIndicator /> : <AppContainer />
    }
}