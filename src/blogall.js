import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Button, Image } from 'react-native';
import config from '../config'
import apis from '../apis/index'
import { Colors } from 'react-native/Libraries/NewAppScreen';

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

    getImgSource = (item) => {
        if (item.htmlDom.match(/<img src="(\S*)"/)) {
            console.log(item.htmlDom.match(/src=(\S*)"/)[1].replace("\"", ''), '...>img url')
            // todo: deal witch copy size Img
            return <Image source={{ uri: item.htmlDom.match(/src=(\S*)"/)[1].replace("\"", '').replace(".jpg", "-copy.jpg") }} style={{ width: 350, height: 200 }}></Image>
        }
        else return <Text>No Img</Text>
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.sectionContainer} >
                            {this.getImgSource(item)}
                            <Text style={styles.sectionTitle} >{item.title}</Text>
                            <Text style={styles.sectionDescription}
                                onPress={() => this.props.navigation.navigate('Detail', {
                                    id: item._id,
                                })}>
                                {item.text}
                            </Text>
                        </View>
                    }
                ></FlatList>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },

});