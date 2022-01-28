/* eslint-disable no-underscore-dangle */
import * as Realm from 'realm-web';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, router, app) => async (dispatch) => {
  try {
    const resp = await app.login(
      Realm.Credentials.emailPassword(formData.email, formData.password),
    );
    const data = {
      result: {
        email: resp._profile.data.email,
        name: resp._profile.data.email,
      },
      token: resp._accessToken,
    };
    dispatch({ type: AUTH, data });

    router('/home');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router, app) => async (dispatch) => {
  try {
    await app.emailPasswordAuth.registerUser(formData.email, formData.password);

    const resp = await app.login(
      Realm.Credentials.emailPassword(formData.email, formData.password),
    );
    const data = {
      result: {
        email: resp._profile.data.email,
        name: resp._profile.data.email,
      },
      token: resp._accessToken,
    };
    dispatch({ type: AUTH, data });

    router('/home');
  } catch (error) {
    console.log(error);
  }
};
