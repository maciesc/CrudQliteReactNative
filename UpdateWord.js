
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'words_db.db', createFromLocation : 1});
 
export default class UpdateWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word_id: '',
      word: '',
      description: '',
    };
  }
  searchWordByID = () => {
    const {word_id} =this.state;
    console.log(this.state.word_id);

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where word_id = ?',
        [word_id],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {

            this.setState({word:results.rows.item(0).word,});
            this.setState({description:results.rows.item(0).description,});
            
          }else{
            alert('Nie ma takiego słowa w słowniku');
            this.setState({
              word:'',
              description:'',
            });
          }
        }
      );
    });
  };

  updateWord = () => {
    var that=this;
    
    const { word_id } = this.state;
    const { word } = this.state;
    const { description } = this.state;
    
    if (word){
      if (description){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE tbl_word set word=?, description=?  where word_id=?',
              [word, description, word_id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert( 'SQLLite', 'Słowo zostało zmienione poprawnie',
                    [
                      {text: 'Akceptuj', onPress: () => that.props.navigation.navigate('HomeScreen')},
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Słowo nie zostało zmienione');
                }
              }
            );
          });
        }else{
          alert('Uzupełnij Opis');
        }
      }else{
        alert('Uzupełnij Słowo');
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
              placeholder="Wpisz id słowa"
              style={{ padding:10 }}
              onChangeText={word_id => this.setState({ word_id })}
            />
            <Mybutton
              title="Znajdz słowo po ID słowa"
              customClick={this.searchWordByID.bind(this)}
            />
            <Mytextinput
              placeholder="Uzupełnij słowo"
              value={this.state.word}
              style={{ padding:10 }}
              onChangeText={word => this.setState({ word })}
            />
            <Mytextinput
              placeholder="Uzupełnij opis"
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              style={{ padding:10 }}
            />
            <Mybutton
              title="Edytuj Słowo"
              customClick={this.updateWord.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}