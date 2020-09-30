import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Detail = ({navigation, route}) => {
  console.log(route,'...route')
  const { id } = route.params
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <View>
        <Text>item ID</Text>
        <Text>{id}</Text>
      </View>
    </View >
  )
};

export default Detail;