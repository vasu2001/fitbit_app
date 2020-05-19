import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default Header = ({navigation, text}) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}>
        {/* <Text>hamburger</Text> */}
        <Image
          source={require('../assets/hamburger.png')}
          style={{height: 30, width: 30, margin: 10}}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'lightblue',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    marginRight: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
