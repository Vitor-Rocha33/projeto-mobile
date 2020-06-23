import React from 'react'
import { StyleSheet, Text, Dimensions, TouchableHighlight } from 'react-native'

export default props => {
    const stylesButton = [styles.button]
    if (props.double) stylesButton.push(styles.buttonDouble)
    if (props.triple) stylesButton.push(styles.buttonTripe)
    if(props.equal) stylesButton.push(styles.equal)
    if (props.operation) stylesButton.push(styles.operationButton)
    return (  /*Criação do botão*/ 
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    );
}

 /*Estilos utilizados no botão*/ 
const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f3f3f5',
        textAlign: 'center',
        borderWidth: 0,
        borderColor: '#c6c6cd',
    },
    equal: {
        backgroundColor: '#73a3cd'
    },
    operationButton: {
        color: '#000',
        backgroundColor: '#dadbdf',
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTripe: {
        width: (Dimensions.get('window').width / 4) * 3,
    }
})