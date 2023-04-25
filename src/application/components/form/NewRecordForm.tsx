import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { MouseEventHandler } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { addPerson } from '../../redux/features/ManageTable';

interface NewRecordFormData {
    name: string;
    age: number;
    birthDate: string;
    bio: string;
}

const NewRecordForm = (props: { handleClose: MouseEventHandler<HTMLButtonElement> | undefined }): JSX.Element => {
    const { t } = useTranslation();
    const today = moment();

    const schema = yup.object().shape({
        name: yup.string().required(t('errorFirstNameRequired') ?? ''),
        age: yup
            .string()
            .required(t('errorAgeRequired') ?? '')
            .matches(/^[1-9]{1,3}$/, t('errorAgeNotValid') ?? ''),
        birthDate: yup
            .date()
            .typeError(t('errorBirthDateNotValid') ?? '')
            .required()
            .test('Is date greater', t('errorBirthDateNotValid') ?? '', function (value) {
                if (!value) return true;
                return moment(today).diff(value) > 0;
            }),
        bio: yup.string().max(250, t('errorBioMaxCharacters') ?? '')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<NewRecordFormData>({
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch();

    const onSubmit = (data: NewRecordFormData): void => {
        const date = new Date(data.birthDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        data.birthDate = `${year}-${month}-${day}`;

        dispatch(addPerson(data));
        //props.handleClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder={t('name') ?? ''} {...register('name')} />
            <Typography>{errors.name?.message?.toString()}</Typography>

            <input type="number" placeholder={t('age') ?? ''} {...register('age')} />
            <Typography>{errors.age?.message?.toString()}</Typography>

            <input type="date" {...register('birthDate')} />
            <Typography>{errors.birthDate?.message?.toString()}</Typography>

            <input type="textarea" placeholder={t('bio') ?? ''} {...register('bio')} />
            <Typography>{errors.bio?.message?.toString()}</Typography>
            <Box>
                <Button type="submit">{t('save')}</Button>
                <Button onClick={props.handleClose}>{t('cancel')}</Button>
            </Box>
        </form>
    );
};

export default NewRecordForm;
