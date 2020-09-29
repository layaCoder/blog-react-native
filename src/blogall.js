import React from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';

export default class BlogAll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: []
        }
    }

    componentDidMount() {
        return fetch('http://39.105.188.13/api/get/blogList?pageIndex=1&pageSize=10')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('res start ...', responseJson, 'test res')
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

    formateList = () => {
        let arr = []
        this.state.responseJson.map()
    }


    render() {
        //  let arr = this.state.dataSource
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Text>blog all</Text>
                <Text>{this.state.dataSource.toString()}</Text>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <Text key={item._id} >{item.title}</Text>}
                ></FlatList>
            </View>
        );
    }
}
