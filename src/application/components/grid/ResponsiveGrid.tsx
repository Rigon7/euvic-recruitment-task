import * as React from 'react';
import { Alert, AlertTitle, Box, Grid, Typography } from '@mui/material';
import PersonCard from '../person-card/PersonCard';
import { PersonData } from '../../interfaces/PersonDataInterface';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Props {
    data: PersonData[];
}

export default function ResponsiveGrid(props: Props): JSX.Element {
    const { data } = props;
    const { t } = useTranslation();

    if (data.length === 0) {
        return (
            <Box>
                <Alert severity="info">
                    <AlertTitle sx={{ fontWeight: 'bold' }}>{t('AlertTitle_NoPeople')}</AlertTitle>
                    <Typography variant="body2">
                        {t('AlertDesc_NoPeople')} <Link to={'/main'}>{t('main')}</Link>
                    </Typography>
                </Alert>
            </Box>
        );
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {data.map((person: PersonData, index: number) => (
                    <Grid item xs={12} sm={4} md={3} key={index}>
                        <PersonCard person={person} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
