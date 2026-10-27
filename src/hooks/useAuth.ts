import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Duplica o export do AuthContext - dívida menor mas confuso
export function useAuth() {
  return useContext(AuthContext);
}
