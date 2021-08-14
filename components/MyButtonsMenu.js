

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MybuttonMenu = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
      width:'70%',
    alignItems: 'center',
    backgroundColor: '#F39C12',
    color: '#FF5733',
    padding: 10,
    marginTop: 16,
    marginLeft: 130,
    marginRight: 130,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
 
});

export default MybuttonMenu;