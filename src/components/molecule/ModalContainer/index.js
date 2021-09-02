import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors, textStyles} from '../../../constants/styling';

const ModalContainer = ({title, isVisible = false, onPressClose, children}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onPressClose}
      onBackButtonPress={onPressClose}
      useNativeDriver={true}
      animationIn="slideInLeft"
      animationOut="slideOutRight">
      <View style={styles.container}>
        {title && (
          <View style={styles.header}>
            <Text style={textStyles.header2}>{title}</Text>
          </View>
        )}
        {children && children}
      </View>
    </Modal>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  header: {
    padding: 10,
  },
});
