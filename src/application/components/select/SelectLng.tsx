import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18';

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
                <Select value={Language} onChange={handleLanguageChange}>
                    <MenuItem value={'en'}>
                        <em>{t('english')}</em>
                    </MenuItem>
                    <MenuItem value={'pl'}>{t('polish')}</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};
export default SelectLng;
