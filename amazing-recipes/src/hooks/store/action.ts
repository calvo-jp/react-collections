import IUser from 'types/user';

interface NavbarAction {
  type: 'navbar.toggle';
}

interface LoginAction {
  type: 'session.login';
  payload: IUser;
}

interface LogoutAction {
  type: 'session.logout';
}

type StoreAction = NavbarAction | LoginAction | LogoutAction;

export default StoreAction;
