import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PersonData } from '../../interfaces/PersonDataInterface';
import { Divider } from '@mui/material';

interface Props {
    person: PersonData;
}

export default function PersonCard(props: Props): JSX.Element {
    const { person } = props;
    const { t } = useTranslation();
    return (
        <Card sx={{ width: '100%', height: '100%' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {person.name}
                </Typography>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary" gutterBottom>
                    {t('birthDate')}:{person.birthDate}
                </Typography>
                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
                    {t('age')}: {person.age}
                </Typography>
                <Typography variant="body2">{person.bio}</Typography>
            </CardContent>
        </Card>
    );
}
