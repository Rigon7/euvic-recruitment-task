import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18';
import { Typography } from '@mui/material';

const SelectLng = (): JSX.Element => {
    const { t } = useTranslation();

    const [Language, setLanguage] = useState('en');

    const handleLanguageChange = (event: SelectChangeEvent): void => {
        setLanguage(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div>
            <FormControl>
                <Select
                    sx={{
                        color: { sm: 'white' },
                        boxShadow: 'none',
                        '.MuiOutlinedInput-notchedOutline': { border: 0 }
                    }}
                    value={Language}
                    onChange={handleLanguageChange}>
                    <MenuItem value={'en'}>
                        <Typography sx={{ fontSize: '0.9rem' }}>{t('english')}</Typography>
                    </MenuItem>
                    <MenuItem value={'pl'}>
                        <Typography sx={{ fontSize: '0.9rem' }}>{t('polish')}</Typography>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};
export default SelectLng;
