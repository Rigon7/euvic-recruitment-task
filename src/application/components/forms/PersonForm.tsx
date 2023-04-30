import { useTranslation } from 'react-i18next';

import { TextField, Box, Button, Typography } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
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
        control,
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 2 }}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <TextField sx={{ width: '100%', mt: 2 }} id="name" label={`${t('firstName')} *`} {...field} />
                    )}
                />
                <Typography variant="body2" sx={{ color: 'red' }}>
                    {errors.name?.message?.toString()}
                </Typography>

                <Controller
                    name="age"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <TextField
                            sx={{ width: '100%', mt: 2 }}
                            id="age"
                            label={`${t('age')} *`}
                            type="number"
                            {...field}
                        />
                    )}
                />
                <Typography variant="body2" sx={{ color: 'red' }}>
                    {errors.age?.message?.toString()}
                </Typography>

                <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <input type="date" {...field} />
                        </Box>
                    )}
                />
                <Typography variant="body2" sx={{ color: 'red' }}>
                    {errors.birthDate?.message?.toString()}
                </Typography>

                <Controller
                    name="bio"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <TextField
                            sx={{ width: '100%', mt: 2 }}
                            id="outlined-multiline-static"
                            label={t('bio')}
                            multiline
                            rows={4}
                            {...field}
                        />
                    )}
                />
                <Typography variant="body2" sx={{ color: 'red' }}>
                    {errors.bio?.message?.toString()}
                </Typography>
                <Box>
                    <Button type="submit">{t('save')}</Button>
                    <Button onClick={props.handleClose}>{t('cancel')}</Button>
                </Box>
            </Box>
        </form>
    );
};

export default PersonForm;
