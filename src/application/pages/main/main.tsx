import { useTranslation } from 'react-i18next';
// import styles from './Main.module.scss';
const Main = (): JSX.Element => {
    const { t } = useTranslation('common');
    return (
        <div>
            <h1>MAIN</h1>
        </div>
    );
};
export default Main;
