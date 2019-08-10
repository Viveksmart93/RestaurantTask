import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView
} from 'react-native';
import {Input,Button} from 'react-native-elements';
import Colors from './color';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView contentContainerStyle={{flex:1}}>
                    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:'20%', height:100}} resizeMode='contain' source={require('./assets/mobile-chat-icon.png')} />
                        <Text style={{margin:5, textAlign:'center', fontSize:15}}>Enter your mobile number</Text>
                        <Text style={{margin:5, textAlign:'center', fontSize:15}}>We will send OTP to your mobile</Text>
                        <Input containerStyle={{width:'85%',marginTop:10}} placeholder="Mobile" placeholderTextColor={Colors.themeColor} inputStyle={{color:Colors.themeColor}}/>

                        <Button title="LOGIN" />

                    </View>
                    </ScrollView>
            </View>
        );
    }

}