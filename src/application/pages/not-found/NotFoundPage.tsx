import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                404
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                {t('AlertTitle_404')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                {t('AlertDesc_404')}
            </Typography>
            <Button variant="outlined" component={RouterLink} to="/" sx={{ textTransform: 'none' }}>
                {t('homeBtn')}
            </Button>
        </Box>
    );
};

export default NotFoundPage;
