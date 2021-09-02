import {createStackNavigator} from '@react-navigation/stack';
import {Contacts, Create, Detail} from '../../views';
import React from 'react';

const Stack = createStackNavigator();

const Routing = () => {
  return (
    <Stack.Navigator initialRouteName="Contacts">
      <Stack.Screen name={'Contacts'} component={Contacts} />
      <Stack.Screen name={'Create'} component={Create} />
      <Stack.Screen name={'Detail'} component={Detail} />
    </Stack.Navigator>
  );
};

export default Routing;
