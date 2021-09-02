import React, {useRef} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {PersistGate} from 'redux-persist/integration/react';
import Routing from './src/config/routing';
import reducer from './src/config/redux/reducer';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  const store = createStore(reducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() =>
            (routeNameRef.current =
              navigationRef.current.getCurrentRoute().name)
          }>
          <Routing />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
