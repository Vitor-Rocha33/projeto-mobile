import React from 'react'
import { StyleSheet, Text, View, } from 'react-native';
import Constants from 'expo-constants'

import Contact from './components/Contact'

export default function Button() {
    return (
    <View style={styles.container}>
      <Contact name='Vitor' phone='3333333'></Contact>
      <Contact name='Vitor' phone='3333333'></Contact>
      <Contact name='Vitor' phone='3333333'></Contact>
      <Contact name='Vitor' phone='3333333'></Contact>
    </View>
      //   <Stack.Navigator>
      //     <Stack.Screen name="Agenda Telefonica" component={ListContacts} />
      //     <Stack.Screen name="Adicionar Contato" component={AddContact} />
      //     <Stack.Screen name="Contato" component={Contact} />
      // </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight + 20
    },
});