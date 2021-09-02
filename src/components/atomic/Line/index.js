import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../constants/styling';

const Line = ({width = 1, color = colors.black}) => {
  return <View style={styles.line(width, color)} />;
};

export default Line;

const styles = StyleSheet.create({
  line: (width, color) => ({
    width: '100%',
    height: width,
    backgroundColor: color,
  }),
});
