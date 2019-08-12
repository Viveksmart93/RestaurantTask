import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    DatePickerAndroid,
    DatePickerIOS,
    Platform,
    Modal
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Colors from './color';
import RadioGroup from 'react-native-radio-buttons-group';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

var gender = [
    {
        label: 'Male',
        value: 'M',
        color: Colors.themeColor
    },
    {
        label: 'Female',
        value: 'F',
        color: Colors.themeColor
    }
]

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateModal: false,
            mobile: this.props.navigation.getParam('mobile'),
            mo: '',
            name: '',
            email: '',
            address: '',
            dob: '',
            gender: 'Male',
            isNameValid: '',
            isMoValid: '',
            isEmailValid: '',
            isAddValid: '',
            isDobValid: '',
            isGenderValid: '',
            chosenDate: new Date()
        }
    }

    validateName(name) {
        return name.trim() === '' ? false : true
    }

    validateMobile(mobile) {
        var phoneno = /^\d{10}$/;
        if (mobile.match(phoneno)) {
            return true;
        }
        return false;
    }

    validateEmail(email) {
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(emailPattern)) {
            return true;
        }
        return false;
    }

    validateAddress(address) {
        return address.trim() === '' ? false : true
    }

    validateDob(date) {
        return date.trim() === '' ? false : true
    }

    onSubmit = () => {
        this.setState({
            isNameValid: this.validateName(this.state.name) || this.nameInput.shake(),
            isMoValid: this.validateMobile(this.state.mo) || this.state.mobile || this.mobileInput.shake(),
            isEmailValid: this.validateEmail(this.state.email) || this.emailInput.shake(),
            isAddValid: this.validateAddress(this.state.address) || this.addressInput.shake(),
            isDobValid: this.validateDob(this.state.dob) || this.dobInput.shake(),
        }, () => {
            if (this.state.isNameValid && this.state.isMoValid && this.state.isEmailValid && this.state.isAddValid && this.state.isDobValid) {
                this.setState({ isLoading: true });
                this.setRegistration();
            }
        })
    }

    setRegistration = () => {
        var url = "http://jinnyhouse.in/api/Registration_User";
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Mobile: this.state.mobile ? this.state.mobile : this.state.mo,
                Name: this.state.name,
                Email: this.state.email,
                Address: this.state.address,
                DOB: this.state.dob,
                CityId: 1,
                Gender: this.state.gender,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false });
                if (responseJson.IsSuccess) {
                    Toast.show(responseJson.Message, Toast.SHORT);
                    if (this.state.mobile) {
                        this.props.navigation.navigate('Home');
                    } else {
                        this.props.navigation.navigate('Login');
                    }
                }else{
                    Toast.show(responseJson.Message, Toast.SHORT);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                console.error(error);
                Toast.show(error, Toast.LONG);
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: '30%', height: 100 }} resizeMode='contain' source={require('./assets/index.png')} />

                        <Input
                            ref={input => this.nameInput = input}
                            inputContainerStyle={{ borderBottomColor: Colors.themeColor }}
                            containerStyle={{ width: '85%', marginTop: 10 }}
                            placeholder="Name"
                            placeholderTextColor={Colors.themeColor}
                            inputStyle={{ color: Colors.themeColor }}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                        />

                        <Input
                            ref={input => this.emailInput = input}
                            inputContainerStyle={{ borderBottomColor: Colors.themeColor }}
                            containerStyle={{ width: '85%', marginTop: 10 }}
                            placeholder="Email"
                            placeholderTextColor={Colors.themeColor}
                            inputStyle={{ color: Colors.themeColor }}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            keyboardType="email-address"
                        />

                        <Input
                            ref={input => this.mobileInput = input}
                            inputContainerStyle={{ borderBottomColor: Colors.themeColor }}
                            containerStyle={{ width: '85%', marginTop: 10 }}
                            placeholder="Mobile"
                            value={this.state.mobile ? this.state.mobile : this.state.mo}
                            editable={this.state.mobile ? false : true}
                            placeholderTextColor={Colors.themeColor}
                            inputStyle={{ color: Colors.themeColor }}
                            onChangeText={(text) => { this.setState({ mo: text }) }}
                            keyboardType="phone-pad"
                        />

                        <Input
                            ref={input => this.dobInput = input}
                            inputContainerStyle={{ borderBottomColor: Colors.themeColor }}
                            containerStyle={{ width: '85%', marginTop: 10 }}
                            placeholder="Birthday"
                            value={this.state.dob}
                            placeholderTextColor={Colors.themeColor}
                            inputStyle={{ color: Colors.themeColor }}
                            onFocus={async () => {
                                if (Platform.OS === 'android') {
                                    try {
                                        const { action, year, month, day } = await DatePickerAndroid.open({
                                            // Use `new Date()` for current date.
                                            // May 25 2020. Month 0 is January.
                                            date: new Date(),
                                        });
                                        if (action !== DatePickerAndroid.dismissedAction) {
                                            // Selected year, month (0-11), day
                                            this.setState({ dob: day + "/" + (month+1) + "/" + year });
                                        }
                                    } catch ({ code, message }) {
                                        console.warn('Cannot open date picker', message);
                                    }
                                } else if (Platform.OS === 'ios') {
                                    this.setState({ dateModal: true });
                                }
                            }}
                        />

                        <Input
                            ref={input => this.addressInput = input}
                            inputContainerStyle={{ borderBottomColor: Colors.themeColor }}
                            containerStyle={{ width: '85%', marginTop: 10 }}
                            placeholder="Address"
                            placeholderTextColor={Colors.themeColor}
                            inputStyle={{ color: Colors.themeColor }}
                            onChangeText={(text) => { this.setState({ address: text }) }}
                        />

                        <View style={{ margin: 10 }}>
                            <RadioGroup
                                radioButtons={gender}
                                onPress={() => {
                                    var value = gender.find(e => e.selected == true)
                                    this.setState({ gender: value.label });
                                }}
                                flexDirection='row'
                            />
                        </View>

                        <Button
                            containerStyle={{ marginTop: 25, marginBottom: 25, width: "80%" }}
                            buttonStyle={{ height: 50, borderRadius: 25, backgroundColor: Colors.themeColor }}
                            title="SIGN UP"
                            loading={this.state.isLoading}
                            onPress={() => {
                                this.onSubmit()
                            }}
                        />

                        <Text>Already Have an account?</Text>

                        <Button type="clear" title="Back to Login" onPress={()=>{this.props.navigation.navigate('Login')}} />

                    </View>
                </ScrollView>
                <Modal
                    visible={this.state.dateModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <DatePickerIOS
                            date={this.state.chosenDate}
                            onDateChange={(newDate) => {this.setState({chosenDate:newDate, dob: moment(newDate).format("DD/MM/YYYY")})}}
                        />

                        <Button title={"Done"} onPress={()=>{this.setState({dateModal:false})}} />    

                    </View>
                </Modal>
            </View>
        );
    }

}