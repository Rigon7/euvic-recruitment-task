import { useTranslation } from 'react-i18next';
import FormModal from '../../components/modals/FormModal';
import TableData from '../../components/table/TableData';
import { Box } from '@mui/material';

const Main = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Box>
            <FormModal>{t('addRecord')}</FormModal>
            <TableData />
        </Box>
    );
};
export default Main;
