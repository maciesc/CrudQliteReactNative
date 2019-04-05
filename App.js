
import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import HomeScreen from './pages/HomeScreen';
import AddWord from './pages/AddWord';
import UpdateWord from './pages/UpdateWord';
import ViewWord from './pages/ViewWord';
import ViewAllWords from './pages/ViewAllWords';
import DeleteWord from './pages/DeleteWord';
 
const App = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Strona główna',
      headerStyle: { backgroundColor: '#009dff' },
      headerTintColor: '#ffffff',
    },
  },
  AddWord: {
    screen: AddWord,
    navigationOptions: {
      title: 'Dodaj słowo',
      headerStyle: { backgroundColor: '#009dff' },
      headerTintColor: '#ffffff',
    },
  },
  UpdateWord: {
    screen: UpdateWord,
    navigationOptions: {
      title: 'Edytuj słowo',
      headerStyle: { backgroundColor: '#009dff' },
      headerTintColor: '#ffffff',
    },
  },
  DeleteWord: {
    screen: DeleteWord,
    navigationOptions: {
      title: 'Usuń słowo',
      headerStyle: { backgroundColor: '#009dff' },
      headerTintColor: '#ffffff',
    },
  },
  ViewWord: {
    screen: ViewWord,
    navigationOptions: {
      title: 'Znajdz słowo',
      headerStyle: { backgroundColor: '#009dff' },
      headerTintColor: '#ffffff',
    },
  },
  ViewAllWords: {
    screen: ViewAllWords,
    navigationOptions: {
      title: 'Wszystkie słowa',
      headerStyle: { backgroundColor: '#009dff' },
      headerTintColor: '#ffffff',
    },
  },
});
export default createAppContainer(App);