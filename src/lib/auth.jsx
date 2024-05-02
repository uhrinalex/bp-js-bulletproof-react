import {initReactQueryAuth} from 'react-query-auth';
import {Spinner} from '@/components/Elements';
import {getUser, loginWithEmailAndPassword, registerWithEmailAndPassword,} from '@/features/auth';
import storage from '@/utils/storage';

/** @param {UserResponse} data*/
async function handleUserResponse(data) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    return await getUser();
  }
  return null;
}

/** @param {import('@/features/auth').LoginCredentialsDTO} data  */
async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  return await handleUserResponse(response);
}

/** @param {import('@/features/auth').RegisterCredentialsDTO} data */
async function registerFn(data) {
  const response = await registerWithEmailAndPassword(data);
  return await handleUserResponse(response);
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
         <Spinner size="xl" />
       </div>
     );
   },
 };

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);
