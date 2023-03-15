import { useRoutes } from 'react-router-dom';
import MainLayout from '../../application/layouts/main-layout/MainLayout';
import Main from '../../application/pages/main/main';

const Router = (): React.ReactElement | null =>
    useRoutes([
        {
            path: '',
            element: <MainLayout />,
            children: [
                {
                    path: '',
                    element: <Main />
                }
            ]
        }
    ]);

export default Router;
