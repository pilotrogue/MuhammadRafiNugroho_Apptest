import axios from 'axios';
import {baseUrl} from '../../../constants/server';

export const getAllContact = () => () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}contact`)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

export const getContactById = id => () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}contact/${id}`)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

export const postContact = data => () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}contact`, data)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

export const putContact = (data, id) => () => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${baseUrl}contact/${id}`, data)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

export const deleteContact = contactId => () => {
  console.log(`${baseUrl}contact/${contactId}`);
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseUrl}contact/${contactId}`)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};
