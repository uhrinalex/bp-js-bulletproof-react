import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc/index.js';
import { useAuth } from '@/lib/auth.jsx';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public.jsx';

export const AppRoutes = () => {
    const auth = useAuth();

    const commonRoutes = [{ path: '/', element: <Landing /> }];

    const routes = auth.user ? protectedRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
};
