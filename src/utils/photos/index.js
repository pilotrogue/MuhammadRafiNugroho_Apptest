import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const imageOptions = {
  mediaType: 'photo',
  includeBase64: true,
  saveToPhotos: false,
  quality: 0.9,
  maxWidth: 350,
  maxHeight: 350,
  selectionLimit: 1,
};

export const openCamera = async onImageSaved => {
  check(PERMISSIONS.ANDROID.CAMERA).then(async result => {
    if (result === RESULTS.DENIED) {
      await request(PERMISSIONS.ANDROID.CAMERA);
    }
  });
  let imgBase64 = null;

  launchCamera(imageOptions, response => {
    if (response.error) {
      console.log('Camera cannot be accessed');
    } else {
      if (response.assets.length > 0) {
        imgBase64 = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
      }
    }
    onImageSaved(imgBase64);
  });
};

export const openGallery = async onImageSaved => {
  check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(async result => {
    if (result === RESULTS.DENIED) {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }
  });
  let imgBase64 = null;

  launchImageLibrary(imageOptions, response => {
    if (response.error) {
      console.log('Gallery cannot be accessed');
    } else {
      if (response.assets.length > 0) {
        imgBase64 = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
      }
    }
    onImageSaved(imgBase64);
  });
};
