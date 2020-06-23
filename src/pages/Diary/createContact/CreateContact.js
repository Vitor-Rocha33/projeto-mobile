import React, { Component } from 'react';
import { Text } from 'react-native';
import Database from '../../../connection';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import {Alert}  from 'react-native'

const db = new Database();
export default class index extends Component {
    state={
        name:'',
        number:''
    };

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{paddingBottom:20}}>
                        <Item floatingLabel>
                            <Label>Nome</Label>
                            <Input value={this.state.name} onChangeText={text => this.setState({name:text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Número</Label>
                            <Input keyboardType = 'numeric' value={this.state.number} onChangeText={text => this.setState({number:text})}/>
                        </Item>
                    </Form>
                    <Button style={{flex:1, justifyContent:'center'}} 
                        onPress={()=>{
                                if(this.state.name===''){
                                    Alert.alert('Erro','Contato sem nome')
                                }
                                else if(this.state.number===''){
                                    Alert.alert('Erro','Contato sem número')
                                }
                                else if(this.state.number.length>=15){
                                    Alert.alert('Erro','Número invalido')
                                }
                                else{
                                    db.addContact(this.state.number,
                                    this.state.name).then(Alert.alert('Sucesso','Usuario cadastrado'));
                                    this.props.navigation.goBack();
                                }}}>
                        <Text style={{color:'white'}}>Adicionar número</Text>
                    </Button>
                </Content>
            </Container>
        );
    };
};