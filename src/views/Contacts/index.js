import {useFocusEffect} from '@react-navigation/core';
import React, {useState} from 'react';
import {useCallback} from 'react';

import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Gap, ItemTile} from '../../components';
import CircleImage from '../../components/atomic/CircleImage';
import {getAllContact} from '../../config/redux/action';

import Icon from 'react-native-vector-icons/FontAwesome';
import {defaultImage} from '../../constants/server';

const Contacts = ({navigation}) => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchContacts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const fetchContacts = () => {
    setRefresh(true);
    dispatch(getAllContact()).then(result => {
      setContacts(result.data);
      setRefresh(false);
    });
  };

  const goToDetail = id => {
    navigation.push('Detail', {id: id});
  };

  const goToCreate = () => {
    navigation.push('Create');
  };

  return (
    <View style={{...styles.container, ...styles.expanded}}>
      <Button title={'Create new contact'} onPress={goToCreate} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={fetchContacts} />
        }
        refreshing={refresh}
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ItemTile
            onPress={() => {
              goToDetail(item.id);
            }}
            title={item.firstName}
            subtitle={item.lastName}
            head={
              <CircleImage
                url={item.photo !== 'N/A' ? item.photo : defaultImage}
              />
            }
          />
        )}
        ItemSeparatorComponent={() => <Gap />}
      />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  expanded: {
    flex: 1,
  },
});
