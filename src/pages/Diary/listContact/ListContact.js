import React, { Component } from 'react';
import Database from '../../../connection';
import {TouchableOpacity} from 'react-native'
import { Container,Icon, Body, Content, List, ListItem, Text,Fab } from 'native-base';

const db = new Database();
export default class index extends Component{
    state={
        contacts: [],
        loading:true
    };

    async getContacts(){
        let contacts = [];
        await db.listContacts().then(data => {
            contacts = data;
            this.setState({contacts:contacts})
        });
        this.setState({loading:false})
    };

    componentDidMount(){
        const { navigation } = this.props;
        this.getContacts();
        this._unsubscribe = navigation.addListener('focus', () => {
            this.setState({loading:true})
            this.getContacts()
        });
        this.setState({loading:false})
    };

    componentWillUnmount() {
        this._unsubscribe();
    };
    
    render() {
        if(this.state.loading===true){
            return(<Text>Carregando</Text>)
        }
        else{
            return (
                <Container>
                <Content>
                <List
                  dataArray={this.state.contacts}
                  renderRow={data => (
                    <ListItem >
                         <TouchableOpacity
                             onPress={() =>
                                this.props.navigation.navigate('Contato',{
                                    contact: data
                                  })}>
                        <Body>
                          <Text>{data.name}</Text>
    
                          <Text>{data.number}</Text>
                        </Body>
                        </TouchableOpacity>
                    </ListItem>
                )}></List>
                </Content>
                <Fab
                onPress={()=> {
                    this.props.navigation.navigate('Adicionar Contato')
                }}
                position="bottomRight">
                <Icon type="FontAwesome5" name="plus" />
              </Fab>
              </Container>
            );
        };
    };
};