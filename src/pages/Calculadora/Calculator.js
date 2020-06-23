import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, ToastAndroid, } from 'react-native'
import Button from './components/Button'
import Display from './components/Display'
import Constants from 'expo-constants'

const initialState = {  /*Iniciando estado do display*/ 
  displayValue: '0',  /*Iniciando display com zero*/ 
  clearDisplay: false,   /*Verificar se é necessario limpar o display*/ 
  operation: null,  /*Setando operacao que vai ser realizado*/ 
  values: [0, 0], /*Array para indexar valores que vao ser realizado as operacoes*/
  current: 0  /*Ponteiro que identifica qual index esta no array*/
}

export default class Calculator extends Component {
    
    state = { ...initialState } /*Criando estado clone*/

    addDigit = n => {   /*Adiciona a numeração no display */ 
      const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay   /*Verifica se e necessario limpar o display*/ 
      
      if (n === '.' && !clearDisplay 
        && this.state.displayValue.includes('.')) {  /* verificando se já existe um ponto, pois se existir um ponto ele não adciona, caso não existe ele irá adcionar esse ponto*/ 
        return
      }
  
      const currentValue = clearDisplay ? '' : this.state.displayValue
      const displayValue = currentValue + n
      this.setState({ displayValue, clearDisplay: false })  /*Inserindo valor no display*/ 
  
      if (n !== '.') {
        const newValue = parseFloat(displayValue)  /*Por conta de um bug aonde o valor não passava como string foi criado essa logica*/ 
        const values = [...this.state.values]     
        values[this.state.current] = newValue
        this.setState({ values })
      }
    }

    clearMemory = () => {
      this.setState({ ...initialState })  /*Botão para limpar display*/ 
    }

    setOperation = operation => {      
      if (this.state.current === 0) {    /*Verifica se o array está no indice 0 */ 
        this.setState({ operation, current: 1, clearDisplay: true })  /*Seta o ponteiro para o indece 1 e coloca o clear display como true*/ 
      } else {
        const equals = operation === '='    /*Verificando se a operação e igual "="*/ 
        const values = [...this.state.values]  
        try {
          if(this.state.operation.includes('/', '=') && this.state.values[1] === 0) {  /*Validação se a tentativas de divição por 0, pois não e possivel essa operação*/ 
            ToastAndroid.show('Impossivel dividir por zero', ToastAndroid.LONG);
            return
          }
          values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)  /* Operações em execução*/ 
        }catch (e) {
          values[0] = this.state.values[0]   /*Criando exerção*/ 
        }

        values[1] = 0 
        this.setState({
          displayValue: `${values[0]}`,   /*setando resultado da operação no display*/ 
          operation: equals ? null : operation,  /*setando operacao, caso a operacao atual for um igual ele seta null caso não ele retorna a operacao atual*/ 
          current: equals ? 0 : 1, /* setando o valor do ponteiro, caso a operacao for um igual ele seta para o indice 0 senao ele seta para o 1 */
          clearDisplay: !equals, /* setando se é necesssario limpar o display, caso a operacao for igual ele seta true senao seta false */
          values, /* Seta o proprio valor */
        })
      }
    }
      /*Botoes*/ 
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Arraste da esquerda para direita para abrir o menu</Text>
          <Display value={this.state.displayValue} />
          <View style={styles.buttons}>
            <Button label='AC' triple onClick={this.clearMemory}/> 
            <Button label='/' operation onClick={this.setOperation}/>
            <Button label='7' onClick={this.addDigit}/>
            <Button label='8' onClick={this.addDigit}/>
            <Button label='9' onClick={this.addDigit}/>
            <Button label='*' operation onClick={this.setOperation}/>
            <Button label='4' onClick={this.addDigit}/>
            <Button label='5' onClick={this.addDigit}/>
            <Button label='6' onClick={this.addDigit}/>
            <Button label='-' operation onClick={this.setOperation}/>
            <Button label='1' onClick={this.addDigit}/>
            <Button label='2' onClick={this.addDigit}/>
            <Button label='3' onClick={this.addDigit}/>
            <Button label='+' operation onClick={this.setOperation}/>
            <Button label='0' double onClick={this.addDigit}/>
            <Button label='.' onClick={this.addDigit}/>
            <Button label='=' equal onClick={this.setOperation}/>
          </View>
        </View>
        );
    }
}

 /*Estilos apresentados*/ 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    text: {
      textAlign: "center"
    }
});