import { useTranslation } from 'react-i18next';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const WelcomePage = (): JSX.Element => {
    const { t } = useTranslation();

    const cardStyle = {
        p: 2,
        height: '100%',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#f5f5f5'
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', textDecoration: 'none' }}>
                {t('helloThere')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
                {t('welcomePageDesc')}
            </Typography>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Box component={RouterLink} to="/main">
                        <Paper sx={cardStyle}>
                            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                                {t('main')}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                                {t('mainCardDesc')}
                            </Typography>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component={RouterLink} to="/views">
                        <Paper sx={cardStyle}>
                            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                                {t('views')}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                                {' '}
                                {t('viewsCardDesc')}
                            </Typography>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WelcomePage;
