import { useTranslation } from 'react-i18next';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TextField, Box, Button, Typography } from '@mui/material';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch } from 'react-redux';
import { addPerson, updatePerson } from '../../redux/features/PersonReducer';
import { PersonData } from '../../interfaces/PersonDataInterface';
import '../forms/PersonForm.module.scss';

const PersonForm = (props: { handleClose: () => void; person?: PersonData }): JSX.Element => {
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
    } = useForm<PersonData>({
        resolver: yupResolver(schema),
        defaultValues: {
            id: props.person?.id || '',
            name: props.person?.name || '',
            age: props.person?.age || undefined,
            birthDate: props.person?.birthDate || '',
            bio: props.person?.bio || ''
        }
    });

    const dispatch = useDispatch();

    const onSubmit = (data: PersonData): void => {
        const date = new Date(data.birthDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        data.birthDate = `${year}-${month}-${day}`;

        if (props.person) {
            dispatch(updatePerson(data));
        } else {
            data.id = uuidv4();
            dispatch(addPerson(data));
        }
        if (props !== undefined) props.handleClose();
    };

    const [value, setValue] = useState<Dayjs | null>(null);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 5 }}>
                <TextField sx={{ width: '100%' }} required id="name" label={t('firstName')} {...register('name')} />
                <Typography>{errors.name?.message?.toString()}</Typography>

                <TextField
                    sx={{ width: '100%', mt: 2 }}
                    required
                    id="age"
                    label={t('age')}
                    type="number"
                    {...register('age')}
                />
                <Typography>{errors.age?.message?.toString()}</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ mt: 2 }}
                        {...register('birthDate')}
                        label={t('birthDate')}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
                {/* <input className="datePicker" type="date" {...register('birthDate')} /> */}
                <Typography>{errors.birthDate?.message?.toString()}</Typography>

                <TextField
                    sx={{ width: '100%', mt: 2 }}
                    id="outlined-multiline-static"
                    label={t('bio')}
                    multiline
                    rows={4}
                    {...register('bio')}
                />
                <Typography>{errors.bio?.message?.toString()}</Typography>

                <Box>
                    <Button type="submit">{t('save')}</Button>
                    <Button onClick={props.handleClose}>{t('cancel')}</Button>
                </Box>
            </Box>
        </form>
    );
};

export default PersonForm;
