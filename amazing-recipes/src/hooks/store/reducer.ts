import IUser from 'types/user';
import StoreAction from './action';
import StoreState from './state';

type StoreReducer = (state: StoreState, action: StoreAction) => StoreState;

const storeReducer: StoreReducer = (state, action) => {
  switch (action.type) {
    case 'navbar.toggle':
      return toggleNavbar(state);
    case 'session.login':
      return login(state, action.payload);
    case 'session.logout':
      return logout(state);
    default:
      return state;
  }
};

const toggleNavbar = (state: StoreState) => {
  return {
    ...state,
    navbarOpened: !state.navbarOpened,
  };
};

const login = (state: StoreState, payload: IUser): StoreState => {
  localStorage.setItem('current_user', JSON.stringify(payload));

  return {
    ...state,
    authorized: true,
    currentUser: payload,
  };
};

const logout = (state: StoreState): StoreState => {
  localStorage.removeItem('current_user');

  return {
    ...state,
    authorized: false,
    currentUser: undefined,
  };
};

export default storeReducer;
