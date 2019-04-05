import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'words_db.db', createFromLocation : 1});
export default class DeleteWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_word_id: '',
    };
  }

  deleteWord = () => {
    var that = this;
    const { input_word_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  tbl_word where word_id=?',
        [input_word_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'SQLLite',
              'Słowo zostało usunięte',
              [
                {
                  text: 'Akceptuj',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Podaj poprawne Id słowa');
          }
        }
      );
    });
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Mytextinput
          placeholder="Wpisz id słowa do usuniecia"
          onChangeText={input_word_id => this.setState({ input_word_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Usun slowo"
          customClick={this.deleteWord.bind(this)}
        />
      </View>
    );
  }
}