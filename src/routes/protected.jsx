import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements/Spinner';
import { MainLayout } from '@/components/Layout/index.js';
import { lazyImport } from '@/utils/lazyImport.js';

const { DiscussionsRoutes } = lazyImport(
    () => import('@/features/discussions/index.js'),
    'DiscussionsRoutes'
);
const { Dashboard } = lazyImport(() => import('@/features/misc/index.js'), 'Dashboard');
const { Profile } = lazyImport(() => import('@/features/users/index.js'), 'Profile');
const { Users } = lazyImport(() => import('@/features/users/index.js'), 'Users');

const App = () => {
    return (
        <MainLayout>
            <Suspense
                fallback={
                    <div className="h-full w-full flex items-center justify-center">
                        <Spinner size="xl" />
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </MainLayout>
    );
};

export const protectedRoutes = [
    {
        path: '/app',
        element: <App />,
        children: [
            { path: '/discussions/*', element: <DiscussionsRoutes /> },
            { path: '/users', element: <Users /> },
            { path: '/profile', element: <Profile /> },
            { path: '/', element: <Dashboard /> },
            { path: '*', element: <Navigate to="." /> },
        ],
    },
];
