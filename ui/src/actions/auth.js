/* eslint-disable no-underscore-dangle */
import * as Realm from 'realm-web';
import { AUTH } from '../constants/actionTypes';

export const formatLikeGoogleResponse = (responseBody, token) => ({
  result: {
    email: responseBody.email,
    name: `${responseBody.first_name} ${responseBody.last_name}`,
  },
  token,
});

export const signin = (formData, router, app) => async (dispatch) => {
  try {
    const user = await app.loginToRealm(
      Realm.Credentials.emailPassword(formData.email, formData.password),
    );
    const userDetails = await user.functions.getSingleUser(user.id);
    const data = formatLikeGoogleResponse(userDetails, user.AccessToken);
    dispatch({ type: AUTH, data });

    router('/home');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router, app) => async (dispatch) => {
  try {
    await app.emailPasswordAuth.registerUser(formData.email, formData.password);
    const user = await app.loginToRealm(
      Realm.Credentials.emailPassword(formData.email, formData.password),
    );

    await user.functions.createUser(
      formData.firstName,
      formData.lastName,
      user.id,
      formData.email,
    );

    const userDetails = await user.functions.getSingleUser(user.id);
    const data = formatLikeGoogleResponse(userDetails, user._accessToken);
    dispatch({ type: AUTH, data });

    router('/home');
  } catch (error) {
    console.log(error);
  }
};

// export const confirmRegistration = (formData, router, app) => async (dispatch) => {
//   try {
//     await app.emailPasswordAuth.confirmUser(formData.token, formData.tokenId);

//     const resp = await app.login(
//       Realm.Credentials.emailPassword(formData.email, formData.password),
//     );

//     const data = formatLikeGoogleResponse(resp);
//     dispatch({ type: AUTH, data });

//     router('/home');
//   } catch (error) {
//     console.log(error);
//   }
// };
