import React from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import config from '../config'
import apis from '../apis/index'
import BlogItem from './BlogItem'

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
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>

                        <BlogItem item={item} {...this.props}></BlogItem>
                    }
                ></FlatList>
            </View >
        );
    }
}
