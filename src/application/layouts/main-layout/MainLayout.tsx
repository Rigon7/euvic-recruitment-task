import { Outlet } from 'react-router-dom';
// import Container from '../../components/container/Container';
import Container from '@mui/material/Container';
import Navbar from '../../components/navbar/Navbar';

export const MainLayout = (): JSX.Element => (
    <div>
        <Navbar />
        <Container>
            <Outlet />
        </Container>
    </div>
);

export default MainLayout;
