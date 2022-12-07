import React from 'react';
import { LoginData } from '../login/loginEntity';

type UserData = {
  user: Omit<LoginData, 'accessToken'> | null;
  setUserData: (user: Omit<LoginData, 'accessToken'>) => void;
};

export const UserContext = React.createContext<UserData>({
  user: null,
  setUserData: () => null,
});

export const useStoreUser = () => React.useContext(UserContext);
