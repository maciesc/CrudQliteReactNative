import React from 'react';
import { Text, View, Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'words_db.db', createFromLocation : 1});
 
export default class ViewWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_word_id: '',
      wordData: '',
    };
  }
  searchWordByID = () => {
    const { input_word_id } = this.state;
    console.log(this.state.input_word_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_word where word_id = ?',
        [input_word_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState({
              wordData: results.rows.item(0),
            });
          } else {
            alert('Słowa nie znaleziono');
            this.setState({
              wordData: '',
            });
          }
        }
      );
    });
  };
  render() {
    return (
      <View>
        <Mytextinput
          placeholder="Wpisz Id słowa"
          onChangeText={input_word_id => this.setState({ input_word_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Znajdz słowo"
          customClick={this.searchWordByID.bind(this)}
        />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>Id słowa: {this.state.wordData.word_id}</Text>
          <Text>Słowo: {this.state.wordData.word}</Text>
          <Text>Opis: {this.state.wordData.description}</Text>
        </View>
      </View>
    );
  }
}