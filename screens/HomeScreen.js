import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image, 
  Alert
} from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';



export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
      chunks: [],
      phonicSound: []
    };
  }
  
  getWord=(word)=>{
    var searchKeyword = word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json" + searchKeyword + ".json"

    return fetch(url)
    .then((data)=>{
        if (data.status === 200)
        {
            return data.json()
        }
        else{
            return null 
        }
    })
    .then((response) =>{


        var responseObject = response 
        if (responseObject) {
            var wordDat = responseObject.definitions[0]
            var definition = wordData.description
            var lexicalCategory = wordData.wordtype

            this.setState({
                "word": this.state.text,
                "definition" : definition,
                "lexicalCategory" : lexicalCategory

            })  
        }
        else{
           this.setState({
            "word": this.state.text,
            "definition": "Not Found"
           }) 
        }
    })
  }
  
  render() {
    return (
      <SafeAreaProvider>

      <View style={styles.container}>
        <Header
          backgroundColor={'purple'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#fff', fontSize: 20 },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text,
            isSearchPressed: false,
            word: 'Loading',
            lexicalCategory: '',
            examples: [],
            definition: ""
        });
            
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.getSnapshotBeforeUpdate({ isSearchPressed: true });
            this.getWord(this.state.text)
          }}>

          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>

          {this.state.chunks.map((item, index)=>{
            return(
             <PhonicSoundButton 
             chunkItem = {this.state.chunks[index]}
             soundChunk = {this.state.phonicSound[index]}
             buttonIndex = {index}/> 
            )
          })}

      </View>

      <View style = {styles.detailsContainer}>
        <Text style = {styles.detailsTitle}>
          Word  : {""}
        </Text>
        <Text style= {{fonstSize:18}}>
          {this.state.word}
        </Text>
      </View>

      <View style = {styles.detailsContainer}>
        <Text style = {styles.detailsTitle}>
           Type : {""}
        </Text>
        <Text style= {{fonstSize:18}}>
          {this.state.lexicalCategory}
        </Text>
      </View>

      <View style = {{flexDirection:'row', flexWrap: 'wrap'}}>
        <Text style = {styles.detailsTitle}>
           Definition : {""}
        </Text>
        <Text style= {{fonstSize:18}}>
          {this.state.definition}
        </Text>
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: "purple",
    borderRadius: 100
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
      },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  detailsContainer: {
    color: 'red'
  },
    detailsTitle: {
        color: 'orange'
    }

});
