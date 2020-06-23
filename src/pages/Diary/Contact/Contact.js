import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import Database from '../../../connection';
import {Icon,Button,Container, Content, Right} from 'native-base';

const db = new Database();
export default class index extends Component {
    state={
        contactId:0,
        name:'',
        number:'',
        loading:true
    };

    componentDidMount(){
        const { navigation } = this.props;
        this.searchContact();
        this._unsubscribe = navigation.addListener('focus', () => {
            this.setState({loading:true})
            this.searchContact()
        });
    };

    componentWillUnmount() {
        this._unsubscribe();
    };

    searchContact(){
        const contactId = this.props.route.params.contact.id;
        db.ContactById(contactId).then(data =>{
            this.setState({
                contactId:data.id,
                name:data.name,
                number:data.number
            });
        });
        this.setState({loading:false})
    };

    render() {
        if(this.state.loading===true){
            return(<Text>Carregando</Text>)
        }
        else{
            return (
                <Container>
                    <Content>
                    <Text> {this.state.name} </Text>
                    <Text style={{paddingBottom:50}}> {this.state.number} </Text>
                        <Button iconRight style={{width:100, marginBottom:20}} 
                            onPress={()=>{
                                this.props.navigation.navigate('Alterar Contato',{
                                    contact: this.state.contactId
                                  });
                            }}>
                            <Text style={{color:'white'}}>Alterar</Text>
                            <Icon name='arrow-forward' />
                        </Button>
                        <Button iconRight style={{width:100}} onPress={()=>{
                            db.deleteContact(this.state.contactId);
                            Alert.alert('Sucesso!','Usuário deletado com sucesso!')
                            this.props.navigation.goBack();
                        }}>
                            <Text style={{color:'white'}}>Deletar</Text>
                            <Icon name='arrow-forward' />
                        </Button>
                    </Content>
                </Container>
            );
        };
    };
};