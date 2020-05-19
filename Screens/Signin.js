import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, Linking} from 'react-native';
import qs from 'qs';
import config from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import {initAxios} from '../axios/axiosConfig';

export default SignIn = ({setAccessToken}) => {
  return (
    <View style={styles.mainView}>
      <Button
        onPress={() => {
          OAuth(config.client_id, setAccessToken);
        }}
        title="SIGNIN TO FITBIT"
      />
    </View>
  );
};

OAuth = (client_id, setAccessToken) => {
  Linking.addEventListener('url', handleUrl);

  function handleUrl(event) {
    // console.log(event.url);
    Linking.removeEventListener('url', handleUrl);
    const [, query_string] = event.url.match(/\#(.*)/);
    // console.log(query_string);
    const query = qs.parse(query_string);
    // console.log(`query: ${JSON.stringify(query)}`);
    console.log('[Signin] token recieved');
    AsyncStorage.setItem('accessToken', query.access_token);
    setAccessToken(query.access_token);
    initAxios(query.access_token);
  }

  const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
    client_id,
    response_type: 'token',
    scope: 'heartrate activity profile sleep social weight',
    redirect_uri: 'fitbit://host_name',
    expires_in: '31536000',
  })}`;
  // console.log(oauthurl);
  Linking.openURL(oauthurl).catch((err) =>
    console.error('[Error processing linking]', err),
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
