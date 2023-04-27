import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const WelcomePage = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Box>
            {' '}
            <Box>{t('main')}</Box> <Box>{t('views')}</Box>
        </Box>
    );
};
export default WelcomePage;
