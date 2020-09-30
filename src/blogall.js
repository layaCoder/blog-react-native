import React from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import config from '../config'
import apis from '../apis/index'

export default class BlogAll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: []
        }
    }

    componentDidMount() {
        return fetch(`${config.server}${apis.blogList.devUrl}?pageIndex=1&pageSize=10`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        //  let arr = this.state.dataSource
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Text>blog All</Text>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <Text key={item._id} >{item.title}</Text>}
                ></FlatList>
            </View>
        );
    }
}
