import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Gap, ModalConfirm, ModalImagePicker} from '../../components';
import CircleImage from '../../components/atomic/CircleImage';
import {
  deleteContact,
  getContactById,
  putContact,
} from '../../config/redux/action';
import {defaultImage} from '../../constants/server';
import {colors, textStyles} from '../../constants/styling';

const Detail = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {id} = route.params;
  const [contactDetail, setContactDetail] = useState({});
  const [modals, setModals] = useState({
    imagePicker: false,
    confirmDelete: false,
  });

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    dispatch(getContactById(id)).then(result => {
      setContactDetail(result.data);
      renderDeleteButton();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDeleteButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          <Button
            onPress={() => {
              setModals({...modals, confirmDelete: true});
            }}
            title="Delete"
            color={colors.red}
          />
        </View>
      ),
    });
  };

  const editContact = data => {
    const req = {
      firstName: data.firstName,
      lastName: data.lastName,
      photo: data.photo,
      age: data.age,
    };
    dispatch(putContact(req, contactDetail.id)).then(result => {
      navigation.goBack();
    });
  };

  const eraseContact = () => {
    console.log(id);
    dispatch(deleteContact(id)).then(result => {
      navigation.goBack();
    });
  };

  const onImagePicked = img => {
    if (!isEdited) {
      setIsEdited(true);
    }
    setModals({...modals, imagePicker: false});
    setContactDetail({...contactDetail, photo: img});
  };

  return (
    <ScrollView style={styles.container}>
      <ModalConfirm
        isVisible={modals.confirmDelete}
        onPressClose={() => {
          setModals({...modals, confirmDelete: false});
        }}
        textConfirm={'Delete'}
        onPressConfirm={eraseContact}
        buttonConfirmColor={colors.red}
        textCancel={'Cancel'}
        onPressCancel={() => {
          setModals({...modals, confirmDelete: false});
        }}
        title={'Delete this contact?'}
        description={'This action cannot be reversed'}
      />
      <ModalImagePicker
        isVisible={modals.imagePicker}
        onPressClose={() => {
          setModals({...modals, imagePicker: false});
        }}
        onImagePicked={onImagePicked}
      />
      <View style={styles.profile}>
        {contactDetail.photo && (
          <TouchableOpacity
            onPress={() => {
              setModals({...modals, imagePicker: true});
            }}>
            <CircleImage
              url={
                contactDetail.photo !== 'N/A'
                  ? contactDetail.photo
                  : defaultImage
              }
              size={100}
            />
          </TouchableOpacity>
        )}
        <Gap />
        <View style={styles.row}>
          <TextInput
            style={styles.enabledInput}
            value={contactDetail.firstName}
            onChangeText={val => {
              if (!isEdited) {
                setIsEdited(true);
              }
              setContactDetail({...contactDetail, firstName: val});
            }}
          />
          <Gap />
          <TextInput
            style={styles.enabledInput}
            value={contactDetail.lastName}
            onChangeText={val => {
              if (!isEdited) {
                setIsEdited(true);
              }
              setContactDetail({...contactDetail, lastName: val});
            }}
          />
        </View>
        <Gap />
        <View style={styles.row}>
          <Text style={textStyles.paragraph}>I am </Text>
          <TextInput
            style={styles.enabledInput}
            value={contactDetail.age ? contactDetail.age.toString() : ''}
            keyboardType={'numeric'}
            onChangeText={val => {
              if (!isEdited) {
                setIsEdited(true);
              }
              setContactDetail({...contactDetail, age: val});
            }}
          />
          <Text style={textStyles.paragraph}> years old</Text>
        </View>
      </View>
      <Gap />
      {isEdited && (
        <Button
          onPress={() => {
            editContact(contactDetail);
          }}
          title="Done"
          color={colors.green}
        />
      )}
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profile: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expanded: {
    flex: 1,
  },
  enabledInput: {
    ...textStyles.header1,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
  },
});
