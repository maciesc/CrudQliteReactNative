
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'words_db.db', createFromLocation : 1});
 
export default class AddWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }
 
  add_word = () => {
    var that = this;
    const { word } = this.state;
    const { description } = this.state;
    
    if (word) {
      if (description) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO tbl_word (word, description) VALUES (?,?)',
              [word, description],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'SQLLite',
                    'Słowo zostało dodane',
                    [
                      {
                        text: 'Akceptuj',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Słowo nie zostało dodane');
                }
              }
            );
          });
        } else {
          alert('Uzupełnij opis');
        }
      } else {
        alert('Uzupełnij słowo');
      }
    
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Wpisz słowo"
              onChangeText={word => this.setState({ word })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Wpisz opis słowa"
              onChangeText={description => this.setState({ description })}
              style={{ padding:10 }}
            />
            
            <Mybutton
              title="Dodaj Słowo"
              customClick={this.add_word.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}