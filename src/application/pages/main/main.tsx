import { useTranslation } from 'react-i18next';
import FormModal from '../../components/modal/FormModal';
import TableData from '../../components/table/TableData';
import styles from './Main.module.scss';
const Main = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={styles['test']}>
            <FormModal>{t('addRecord')}</FormModal>
            <TableData />
        </div>
    );
};
export default Main;
