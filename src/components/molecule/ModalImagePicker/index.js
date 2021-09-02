import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {openCamera, openGallery} from '../../../utils';
import {Gap} from '../../atomic';
import ModalContainer from '../ModalContainer';

const ModalImagePicker = ({isVisible, onPressClose, onImagePicked}) => {
  return (
    <ModalContainer
      isVisible={isVisible}
      onPressClose={onPressClose}
      title={'Pick an image'}>
      <View style={styles.container}>
        <Button
          title={'Pick one from gallery'}
          onPress={() => {
            openGallery(onImagePicked);
          }}
        />
        <Gap />
        <Button
          title={'Take a picture'}
          onPress={() => {
            openCamera(onImagePicked);
          }}
        />
      </View>
    </ModalContainer>
  );
};

export default ModalImagePicker;

const styles = StyleSheet.create({container: {padding: 10}});
