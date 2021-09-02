import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {colors, textStyles} from '../../../constants/styling';
import {Gap} from '../../atomic';
import ModalContainer from '../ModalContainer';

const ModalConfirm = ({
  isVisible,
  onPressClose,
  title = 'Are you sure?',
  description,
  textConfirm = 'Yes',
  onPressConfirm,
  buttonConfirmColor = colors.green,
  textCancel = 'No',
  onPressCancel,
  buttonCancelColor = colors.black,
}) => {
  return (
    <ModalContainer isVisible={isVisible} onPressClose={onPressClose}>
      <View style={styles.container}>
        <Text style={textStyles.header2}>{title}</Text>
        {description && <Text style={textStyles.paragraph}>{description}</Text>}
        <Gap />
        <View style={styles.row}>
          <Button
            title={textCancel}
            onPress={onPressCancel}
            color={buttonCancelColor}
          />
          <Gap />
          <Button
            title={textConfirm}
            onPress={onPressConfirm}
            color={buttonConfirmColor}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

export default ModalConfirm;

const styles = StyleSheet.create({
  container: {padding: 10, alignItems: 'center'},
  row: {
    flexDirection: 'row',
  },
});
