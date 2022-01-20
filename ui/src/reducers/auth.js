import { AUTH, LOGOUT } from '../constants/actionTypes';

// eslint-disable-next-line default-param-last
const authReducer = (state = { authData: null }, action) => {
  console.log(`action: ${action.type}`);
  console.log(`state: ${state}`);
  switch (action.type) {
    case AUTH:
      console.log(action.data);
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
