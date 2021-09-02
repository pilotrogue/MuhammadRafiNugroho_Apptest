import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {textStyles, colors} from '../../../constants/styling';
import Gap from '../../atomic/Gap';

const ItemTile = ({title, subtitle, head, tail, onPress}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...styles.row}}
      onPress={onPress}>
      {head && head}
      {head && <Gap />}
      <View style={{...styles.column, ...styles.expanded}}>
        {title && <Text style={textStyles.header3}>{title}</Text>}
        {subtitle && <Text style={textStyles.paragraph}>{subtitle}</Text>}
      </View>
      {tail && <Gap />}
      {tail && tail}
    </TouchableOpacity>
  );
};

export default ItemTile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  expanded: {
    flex: 1,
  },
});
