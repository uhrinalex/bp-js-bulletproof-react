import { lazyImport } from '@/utils/lazyImport.js';

const { AuthRoutes } = lazyImport(() => import('@/features/auth/index.js'), 'AuthRoutes');

export const publicRoutes = [
    {
        path: '/auth/*',
        element: <AuthRoutes />,
    },
];
