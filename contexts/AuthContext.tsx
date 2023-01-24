import React from 'react';
import { User } from 'firebase/auth';
export const AuthContext = React.createContext<{ user: User | null, loading: boolean }>({ user: null, loading: true });