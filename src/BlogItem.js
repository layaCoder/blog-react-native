import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class BlogItem extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {

        // }
    }

    componentDidMount() {
    }

    getImgSource = (item) => {
        if (item.htmlDom.match(/<img src="(\S*)"/)) {
            let url = item.htmlDom.match(/src=(\S*)"/)[1].replace("\"", '')
            if (url.indexOf('-copy') !== -1) {
                return <Image source={{ uri: url.replace(".jpg", "-copy.jpg") }} style={{ width: 350, height: 200 }}></Image>
            } else {
                return <Image source={{ uri: url }} style={{ width: 350, height: 200 }}></Image>
            }
        }
        else return <Text>No Img</Text>
    }

    render() {
        let item = this.props.item
        return (
            <View style={styles.sectionContainer} >
                {this.getImgSource(item)}
                <Text style={styles.sectionTitle} >{item.title}</Text>
                <Text style={styles.sectionDescription}
                    numberOfLines={10}
                    ellipsizeMode={'tail'}
                    onPress={() => this.props.navigation.navigate('Detail', {
                        id: item._id,
                    })}>
                    {item.text}
                </Text>
            </View>
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