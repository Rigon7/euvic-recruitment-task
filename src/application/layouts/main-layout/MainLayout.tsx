import { Outlet } from 'react-router-dom';
import Container from '../../components/container/Container';

export const MainLayout = (): JSX.Element => (
    <div>
        <Container>
            <Outlet />
        </Container>
    </div>
);

export default MainLayout;
