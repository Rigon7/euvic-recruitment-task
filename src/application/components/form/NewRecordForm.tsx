import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { MouseEventHandler } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface NewRecordFormData {
    firstName: string;
    age: number;
    birthDate: string;
    bio: string;
}

const NewRecordForm = (props: { handleClose: MouseEventHandler<HTMLButtonElement> | undefined }): JSX.Element => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        firstName: yup.string().required(t('errorFirstNameRequired') ?? ''),
        age: yup
            .number()
            .required(t('errorFirstNameRequired1') ?? '')
            .positive()
            .integer()
            .min(1),
        birthDate: yup.date().required(t('errorFirstNameRequired2') ?? ''),
        bio: yup.string().max(250)
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<NewRecordFormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: NewRecordFormData): void => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder={t('firstName') ?? ''} {...register('firstName')} />
            <Typography>{errors.firstName?.message?.toString()}</Typography>
            <input type="number" placeholder={t('age') ?? ''} {...register('age')} />
            <Typography>{errors.age?.message?.toString()}</Typography>
            <input type="date" {...register('birthDate')} />
            <Typography>{errors.birthDate?.message?.toString()}</Typography>
            <input type="text" placeholder={t('bio') ?? ''} {...register('bio')} />
            <Box>
                <Button type="submit">{t('save')}</Button>
                <Button onClick={props.handleClose}>{t('cancel')}</Button>
            </Box>
        </form>
    );
};

export default NewRecordForm;
