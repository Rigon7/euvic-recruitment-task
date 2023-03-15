import { useRoutes } from 'react-router-dom';
import MainLayout from '../../application/layouts/main-layout/MainLayout';
import Main from '../../application/pages/main/Main';
import Views from '../../application/pages/views/views';

const Router = (): React.ReactElement | null =>
    useRoutes([
        {
            path: '',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Main />
                },
                {
                    path: 'views',
                    element: <Views />
                }
            ]
        }
    ]);

export default Router;
