import React from 'react'
import { StyleSheet,View, Text } from 'react-native'
import { render } from 'react-dom'

export default props => {
    return(
    <View style={styles.contact}>
        <Text>Nome: {props.name}</Text>
        <Text>Telefone: {props.phone}</Text>
    </View>
    )   
}

const styles = StyleSheet.create({
    contact: {
        padding: 20,
        borderRadius: 0,
        backgroundColor: '#f0f0f0',
        marginBottom: 16
    }
})