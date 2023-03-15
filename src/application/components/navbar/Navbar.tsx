import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// import styles from './Navbar.module.scss';
const Navbar = (): JSX.Element => {
    const { t } = useTranslation('common');
    return (
        <nav>
            <Link to="/">
                <h1>EUVIC</h1>
            </Link>
            <ul>
                <li>
                    <Link to="/">Main</Link>
                </li>
                <li>
                    <Link to="/views">Views</Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;
