import { useTranslation } from 'react-i18next';

import * as React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const WelcomePage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                Hello there!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
                This is a sample application that demonstrates how to use Redux and Material-UI in a React application.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} component={RouterLink} to="/main">
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                            List View
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                            This section displays a list of people and their information in a table. You can edit,
                            update, and delete records, as well as add new people.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                            Tiles View
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                            This section displays the same information as the List View, but in a different format.
                            People`&apos;`s information is displayed on cards.
                        </Typography>
                        <Button variant="contained" component={RouterLink} to="/views" sx={{ textTransform: 'none' }}>
                            Go to Tiles View
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WelcomePage;
