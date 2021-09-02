import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Gap, Line, ModalImagePicker} from '../../components';
import CircleImage from '../../components/atomic/CircleImage';
import {postContact} from '../../config/redux/action';
import {defaultImage} from '../../constants/server';
import {colors, textStyles} from '../../constants/styling';

const Create = ({navigation}) => {
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    imagePicker: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: null,
    lastName: null,
    age: null,
    photo: null,
  });

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });

  const saveContact = () => {
    const isValidated = validateInput();
    if (isValidated) {
      dispatch(postContact(input)).then(result => {
        navigation.goBack();
      });
    }
  };

  const validateInput = () => {
    let errors = {};
    if (input.firstName.length === 0) {
      errors.firstName = 'Please fill in your first name';
    }

    if (input.lastName.length === 0) {
      errors.lastName = 'Please fill in your last name';
    }

    if (input.age.length === 0) {
      errors.age = 'Please fill in your age';
    }

    if (input.photo.length === 0) {
      errors.photo = 'Please upload your profile image';
    }

    console.log(errors);

    if (Object.keys(errors).length > 0) {
      console.log('errors.length > 0');
      setErrorMessage(errors);
      return false;
    } else {
      console.log('else');
      setErrorMessage({
        firstName: null,
        lastName: null,
        age: null,
        photo: null,
      });
      return true;
    }
  };

  const onImagePicked = img => {
    setModals({...modals, imagePicker: false});
    setInput({...input, photo: img});
    setErrorMessage({...errorMessage, photo: null});
  };

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  return (
    <View style={styles.expanded}>
      <ModalImagePicker
        isVisible={modals.imagePicker}
        onPressClose={() => {
          setModals({...modals, imagePicker: false});
        }}
        onImagePicked={onImagePicked}
      />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.image}
          onPress={() => {
            setModals({...modals, imagePicker: true});
          }}>
          <CircleImage
            url={input.photo ? input.photo : defaultImage}
            size={100}
          />
        </TouchableOpacity>
        <Gap />
        {errorMessage.photo !== null && (
          <>
            <Text
              style={{
                ...textStyles.paragraph,
                ...textStyles.colorRed,
                ...textStyles.center,
              }}>
              {errorMessage.photo}
            </Text>
            <Gap />
          </>
        )}
        <View style={styles.row}>
          <View
            style={{...styles.input, ...styles.container, ...styles.expanded}}>
            <Text style={{...textStyles.subtitle, ...textStyles.bold}}>
              First Name
            </Text>
            <TextInput
              style={{...textStyles.paragraph}}
              keyboardType={'default'}
              onChangeText={val => {
                setInput({...input, firstName: val});
                if (errorMessage.firstName !== null) {
                  setErrorMessage({...errorMessage, firstName: null});
                }
              }}
              placeholder={'John'}
              placeholderTextColor={colors.gray}
            />
            <Line color={colors.blue} />
            {errorMessage.firstName !== null && (
              <>
                <Text
                  style={{
                    ...textStyles.paragraph,
                    ...textStyles.colorRed,
                  }}>
                  {errorMessage.firstName}
                </Text>
              </>
            )}
          </View>

          <View
            style={{...styles.input, ...styles.container, ...styles.expanded}}>
            <Text style={{...textStyles.subtitle, ...textStyles.bold}}>
              Last Name
            </Text>
            <TextInput
              style={{...textStyles.paragraph}}
              keyboardType={'default'}
              onChangeText={val => {
                setInput({...input, lastName: val});
                if (errorMessage.lastName !== null) {
                  setErrorMessage({...errorMessage, lastName: null});
                }
              }}
              placeholder={'Doe'}
              placeholderTextColor={colors.gray}
            />
            <Line color={colors.blue} />
            {errorMessage.lastName !== null && (
              <>
                <Text
                  style={{
                    ...textStyles.paragraph,
                    ...textStyles.colorRed,
                  }}>
                  {errorMessage.lastName}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={{...styles.input, ...styles.container}}>
          <Text style={{...textStyles.subtitle, ...textStyles.bold}}>Age</Text>
          <TextInput
            style={{...textStyles.paragraph}}
            keyboardType={'numeric'}
            onChangeText={val => {
              setInput({...input, age: val});
              if (errorMessage.age !== null) {
                setErrorMessage({...errorMessage, age: null});
              }
            }}
            placeholder={'40'}
            placeholderTextColor={colors.gray}
          />
          <Line color={colors.blue} />
          {errorMessage.age !== null && (
            <>
              <Text
                style={{
                  ...textStyles.paragraph,
                  ...textStyles.colorRed,
                }}>
                {errorMessage.age}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
      <Button
        title={'Save'}
        onPress={() => {
          saveContact(input);
        }}
      />
      {/* <TouchableOpacity
        style={styles.container}
        onPress={() => {
          saveContact(input);
        }}>
        <Text>Save</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {padding: 10},
  input: {
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  expanded: {
    flex: 1,
  },
  image: {
    alignItems: 'center',
  },
});
