import IUser from 'types/user';

interface StoreState {
  authorized?: boolean;
  currentUser?: IUser;
  navbarOpened?: boolean;
}

export default StoreState;
