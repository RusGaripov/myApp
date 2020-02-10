import { StackActions, NavigationActions } from 'react-navigation'

const resetTo = (navigation, screen) => navigation.dispatch(StackActions.reset({index:0,key:null,actions:[NavigationActions.navigate({routeName:screen})]}))

const isScreen = (name) => {
  console.log('current screen: ', name);
}

export {
  resetTo,
  isScreen
}