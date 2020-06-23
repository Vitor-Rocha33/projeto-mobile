import React, {useState} from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview'

import Constants from 'expo-constants'

export default function Browser() {
    const [ page, setPage ] = useState()
    const [ url, setUrl ] = useState(String)
    
    return (  
      <>   
        <View style={styles.inputContainer}> 
          <TextInput style={styles.input} onChangeText={url => setUrl(url)}></TextInput>  
        </View>
        <WebView
          source={{
            uri: url /*Apresentando variavel*/  
          }}    
        /> 
      </>   
    );
}


 /*estilos apresentados*/  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      paddingTop: Constants.statusBarHeight  /* Paddingtop pegando o tamanho da barra de status do aparelho*/  
    },
    input: {
      padding: 7,
      borderWidth: 1,
      borderRadius: 20
    }
});