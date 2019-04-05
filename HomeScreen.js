/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import { View } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'words_db.db', createFromLocation : 1});
 
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_word'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tbl_word', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tbl_word(word_id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT,description TEXT',
              []
            );
          }
        }
      );
    });
  }
 
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <Mytext text="Słownik - SQLLite" />
        <Mybutton
          title="Dodaj Słowo"
          customClick={() => this.props.navigation.navigate('AddWord')}
        />
        <Mybutton
          title="Edytuj Słowa"
          customClick={() => this.props.navigation.navigate('UpdateWord')}
        />
        <Mybutton
          title="Wyszukaj Słowo"
          customClick={() => this.props.navigation.navigate('ViewWord')}
        />
        <Mybutton
          title="Zobacz Słownik"
          customClick={() => this.props.navigation.navigate('ViewAllWords')}
        />
        <Mybutton
          title="Usuń Słowo"
          customClick={() => this.props.navigation.navigate('DeleteWord')}
        />
      </View>
    );
  }
}