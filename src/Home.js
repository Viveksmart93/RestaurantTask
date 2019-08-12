import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import Colors from './color';
import { Card } from 'react-native-elements';
import { Rating } from 'react-native-ratings';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            restaurants: [],
            refreshing: false
        }
    }

    componentDidMount() {
        this.getRestaurant()
    }

    getRestaurant = () => {
        var url = "http://jinnyhouse.in/api/GetRestaurant";

        if (!this.state.refreshing)
            this.setState({ isLoading: true });

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, refreshing:false });
                if (responseJson.IsSuccess) {
                    this.setState({ restaurants: responseJson.Data });
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false, refreshing:false });
                console.error(error);
                Toast.show(error, Toast.LONG);
            });
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.getRestaurant()
        });

    }

    renderItem = ({ item, index }) => (
        <Card
            image={{ uri: item.ImageUrl }}
            containerStyle={{borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
            <Text style={{fontSize:18,fontWeight:'bold', color: '#000'}}>{item.Name}</Text>
            <Text>{item.Address}, {item.CityName}</Text>
            <View style={{flexDirection:'row'}}>
            <Rating
                ratingCount={3}
                imageSize={20}
                readonly={true}
            />
            </View>
        </Card>
    )

    render() {
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={this.state.restaurants}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                />
                {this.state.isLoading ?
                    <View style={{
                        flex: 1, elevation: 2, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'center', position: 'absolute', width: '100%', height: '100%'
                    }}>
                        <ActivityIndicator color={"white"} size='large' />
                        <Text style={{ color: "white", marginTop: 10 }}>{"Please Wait...!"}</Text>
                    </View>
                    : null}
            </View>
        );
    }

}