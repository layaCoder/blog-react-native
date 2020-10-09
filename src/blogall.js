import React from 'react';
import { StyleSheet, FlatList, Text, View, Image } from 'react-native';
import config from '../config'
import apis from '../apis/index'
import BlogItem from './BlogItem'

export default class BlogAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            page: 1
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

    _keyExtractor = (item) => {
        return item._id
    }

    _renderItem = ({ item }) => {
        return <BlogItem item={item} {...this.props}></BlogItem>
    }

    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.loadNextPage() // fetch data
            this.onEndReachedCalledDuringMomentum = true;
        }
    };

    loadNextPage = () => {
        this.setState({ isLoading: true })
        fetch(`${config.server}${apis.blogList.devUrl}?pageIndex=${this.state.page + 1}&pageSize=10`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('blog item ...>', responseJson)
                let res = this.state.dataSource.concat(responseJson)
                this.setState(prevState => ({ dataSource: res, isLoading: false, page: this.state.page + 1 }))
            })
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 10 }}>
                {this.state.isLoading ? <Text>Loading ...</Text> : null}
                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={this._keyExtractor}
                    // renderItem={({ item }) =>
                    //     <BlogItem item={item} {...this.props}></BlogItem>
                    // }
                    renderItem={this._renderItem}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.onEndReachedCalledDuringMomentum = false;
                    }}
                ></FlatList>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    Loading: {
        color: 'red',
        textAlign: 'center'
    }

});