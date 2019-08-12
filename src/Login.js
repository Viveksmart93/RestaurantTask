import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StatusBar
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Colors from './color';
import Toast from 'react-native-simple-toast';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile:'',
            isMobileValid:true,
            isLoading: false
        }
    }

    validateMobile(mobile) {
        var phoneno = /^\d{10}$/;
        if(mobile.match(phoneno)){
            return true;
        }
        return false;
    }

    onSubmit = () => {
        this.setState({
            isMobileValid: this.validateMobile(this.state.mobile) || this.mobileInput.shake()
        },()=>{
            if(this.state.isMobileValid){
                this.setState({isLoading:true});
                this.userSendOtp();
            }
        })
    }

    userSendOtp = () => {
        var url = `http://jinnyhouse.in/api/User_SendOTP?Mobile=${this.state.mobile}`;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading:false});
                if(responseJson.IsSuccess){
                    Toast.show(responseJson.Message,Toast.SHORT);
                    this.setState=({mobile:''});
                    this.props.navigation.navigate('LoginOtp',{data:responseJson.Data,mobile:this.state.mobile});
                }else{
                    Toast.show(responseJson.Message);
                }
            })
            .catch((error) => {
                this.setState({isLoading:false});
                console.error(error);
                Toast.show(error);
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: '20%', height: 120 }} resizeMode='contain' source={require('./assets/mobile-chat-icon.png')} />
                        <Text style={{ margin: 5, textAlign: 'center', fontSize: 15 }}>Enter your mobile number</Text>
                        <Text style={{ margin: 5, textAlign: 'center', fontSize: 15 }}>We will send OTP to your mobile</Text>
                        <Input
                            ref={input => this.mobileInput = input}
                            inputContainerStyle={{ borderBottomColor: Colors.themeColor }}
                            containerStyle={{ width: '85%', marginTop: 10, marginBottom: 10 }}
                            placeholder="Mobile" placeholderTextColor={Colors.themeColor}
                            inputStyle={{ color: Colors.themeColor }}
                            keyboardType='phone-pad'
                            onChangeText={(text)=>{this.setState({mobile:text})}}
                            errorMessage={this.state.isMobileValid ? null : 'Please enter valid mobile number'}
                        />

                        <Button
                            containerStyle={{ marginTop: 25, marginBottom: 25, width: "80%" }}
                            buttonStyle={{ height: 50, borderRadius: 25, backgroundColor: Colors.themeColor }}
                            title="LOGIN"
                            loading={this.state.isLoading}
                            onPress={() => { this.onSubmit() }} />

                        <Text>Don't Have account?</Text>

                        <Button type="clear" containerStyle={{ marginBottom: 50 }} title="SIGN UP"
                        onPress={()=>{this.props.navigation.navigate('SignUp')}} />

                    </View>
                </ScrollView>

            </View>
        );
    }

}