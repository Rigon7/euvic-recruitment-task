import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { MouseEventHandler } from 'react';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const NewRecordForm = (props: { handleClose: MouseEventHandler<HTMLButtonElement> | undefined }): JSX.Element => {
    const { t } = useTranslation();

    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any): void => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder={t('firstName') ?? ''} {...register('firstName')} />
            <input type="number" placeholder={t('age') ?? ''} {...register('age')} />
            <input type="date" {...register('date')} />
            <input type="text" placeholder={t('bio') ?? ''} {...register('bio')} />
            <Box>
                <Button type="submit">{t('save')}</Button>
                <Button onClick={props.handleClose}>{t('cancel')}</Button>
            </Box>
        </form>
    );
};

export default NewRecordForm;
