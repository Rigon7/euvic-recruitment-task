import { useRoutes } from 'react-router-dom';
import MainLayout from '../../application/layouts/main-layout/MainLayout';
import NotFoundPage from '../../application/pages/not-found/NotFoundPage';
import WelcomePage from '../../application/pages/welcome-page/WelcomePage';
import Main from '../../application/pages/main/Main';
import Views from '../../application/pages/views/Views';

const Router = (): React.ReactElement | null =>
    useRoutes([
        {
            path: '',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <WelcomePage />
                },
                {
                    path: 'main',
                    element: <Main />
                },
                {
                    path: 'views',
                    element: <Views />
                },
                {
                    path: '*',
                    element: <NotFoundPage />
                }
            ]
        }
    ]);

export default Router;
