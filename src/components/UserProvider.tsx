import { LoginData } from '@/modules/login/loginEntity';
import { UserContext } from '@/modules/user/userProvider';
import { useClientOnly } from '@/shared/utils';
import { useEffect, useState } from 'react';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Omit<LoginData, 'accessToken'> | null>(null);
  const clientOnly = useClientOnly();

  const setUserData = (payload: Omit<LoginData, 'accessToken'>) => {
    if (clientOnly) {
      setUser(payload);

      localStorage.setItem('userData', JSON.stringify(payload));
    }
  };

  useEffect(() => {
    if (clientOnly) {
      const userStorage = localStorage.getItem('userData');
      const user = userStorage !== null ? JSON.parse(userStorage) : [];
      setUser(user);
    }
  }, [clientOnly]);

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
