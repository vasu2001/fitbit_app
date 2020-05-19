import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Signin from './Screens/Signin';
import Fitbit from './Screens/Fitbit';
import {initAxios} from './axios/axiosConfig';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((accessToken) => {
      console.log('[AccessToken]', accessToken);
      setAccessToken(accessToken || 'none');
      if (accessToken !== null) initAxios(accessToken);
    });
  }, []);

  return (
    (accessToken === 'none' && <Signin setAccessToken={setAccessToken} />) ||
    (accessToken !== null && (
      <Fitbit
        logout={() => {
          setAccessToken('none');
          AsyncStorage.removeItem('accessToken');
        }}
      />
    ))
  );
};

export default App;
