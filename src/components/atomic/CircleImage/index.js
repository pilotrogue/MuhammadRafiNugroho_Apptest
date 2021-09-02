import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {defaultImage} from '../../../constants/server';

const defaultSize = 50;

const CircleImage = ({url, size = defaultSize}) => {
  return <Image source={{uri: url}} style={styles.image(size)} />;
};

export default CircleImage;

const styles = StyleSheet.create({
  image: size => ({
    height: size,
    width: size,
    borderRadius: size / 2,
  }),
});
