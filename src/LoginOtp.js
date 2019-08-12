import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Colors from './color';
import OtpInputs from 'react-native-otp-inputs';
import Toast from 'react-native-simple-toast';

export default class LoginOtp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: this.props.navigation.getParam('mobile'),
            data: this.props.navigation.getParam('data'),
            code: '',
            isLoading: false,
            resendLoading: false
        }
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
                    Toast.show(responseJson.Message, Toast.SHORT);
                }
            })
            .catch((error) => {
                this.setState({isLoading:false});
                console.error(error);
                Toast.show(error,Toast.LONG);
            });
    }

    verifyOtp = () => {
        this.setState({isLoading:true});
        setTimeout(()=>{
            this.setState({isLoading: false});
            if(this.state.code===this.state.data.OTP){
                Toast.show('Otp verified successfully',Toast.SHORT);
                if(this.state.data.UserId){
                    this.props.navigation.navigate('Home');
                }else{
                    this.props.navigation.navigate('SignUp',{mobile:this.state.mobile});
                }
                
            }else{
                Toast.show('Invalid otp',Toast.SHORT);
            }
        },2000);
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <ScrollView contentContainerStyle={{flex:1}}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: '20%', height: 100 }} resizeMode='contain' source={require('./assets/email-sms-icon.png')} />
                        <Text style={{ margin: 5, textAlign: 'center', fontSize: 15 }}>Enter your OTP to verify</Text>
                        <Text style={{ margin: 5, textAlign: 'center', fontSize: 15 }}>We have send OTP to your mobile number</Text>

                        <View style={{ height:100}}>
                            <OtpInputs
                                handleChange={code => {this.setState({code})}}
                                numberOfInputs={4}
                            />
                        </View>

                        <Button
                            containerStyle={{ marginTop: 25, marginBottom: 25, width: "50%" }}
                            buttonStyle={{ height: 50, borderRadius: 25, backgroundColor: Colors.themeColor }}
                            title="VERIFY"
                            loading={this.state.isLoading}
                            onPress={()=>{
                                this.verifyOtp()
                            }}
                        />

                        <Text>Haven't received OTP?</Text>

                        <Button type="clear" containerStyle={{ marginBottom: 50 }} title="RESEND"
                            loading={this.state.resendLoading}
                            onPress={()=>{
                                this.setState({resendLoading:true});
                                this.userSendOtp()
                            }}/>

                    </View>
                </ScrollView>
            </View>
        );
    }

}