import { useTranslation } from 'react-i18next';
import TableData from '../../components/table/TableData';
import styles from './Main.module.scss';
const Main = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={styles['test']}>
            <h1>MAIN</h1>
            <TableData />
        </div>
    );
};
export default Main;
