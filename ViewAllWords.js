import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'words_db.db', createFromLocation : 1});
 
export default class ViewAllWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tbl_word', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#8cd3ff' }} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.word_id} style={{ backgroundColor: 'white', padding: 20 }}>
              <Text>Id: {item.word_id}</Text>
              <Text>Name: {item.word}</Text>
              <Text>Contact: {item.description}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}