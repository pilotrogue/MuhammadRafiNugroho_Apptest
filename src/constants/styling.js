import {StyleSheet} from 'react-native';

export const colors = {
  black: '#141414',
  gray: '#cccccc',
  red: '#ba0000',
  blue: '#0076ba',
  white: '#ffffff',
  green: '#12a621',
};

export const textStyles = StyleSheet.create({
  colorBlue: {
    color: colors.blue,
  },
  colorRed: {
    color: colors.red,
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: '900',
  },
  header1: {
    fontSize: 28,
    color: colors.black,
    fontWeight: 'bold',
  },
  header2: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
  },
  header3: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    color: colors.black,
  },
  subtitle: {
    fontSize: 12,
    color: colors.black,
  },
});
