import { Route, Routes } from 'react-router-dom';

import { Login } from './Login.jsx';
import { Register } from './Register.jsx';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
