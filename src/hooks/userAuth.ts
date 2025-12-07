import { useContext } from 'react';

import { AuthContext } from '../providers/AuthProvider';

export const useUserAuth = () => {
  const { user, isLoading, login, signup, logout } = useContext(AuthContext);

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
  };
};
