import { useTranslation } from 'react-i18next';

import { TextField, Box, Button, Input, FormControl, FormHelperText, InputLabel } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch } from 'react-redux';
import { addPerson, updatePerson } from '../../redux/features/PersonReducer';
import { PersonData } from '../../interfaces/PersonDataInterface';
import styles from '../forms/PersonForm.module.scss';

const PersonForm = (props: { handleClose: () => void; person?: PersonData }): JSX.Element => {
    const { t } = useTranslation();
    const today = moment();

    const schema = yup.object().shape({
        name: yup.string().required(t('errorFirstNameRequired') ?? ''),
        age: yup
            .string()
            .required(t('errorAgeRequired') ?? '')
            .test('Is valid age', t('errorAgeNotValid') ?? '', (value): boolean =>
                value ? parseInt(value) > 0 && parseInt(value) < 130 : true
            ),
        birthDate: yup
            .date()
            .typeError(t('errorBirthDateNotValid') ?? '')
            .required()
            .test('Is date greater', t('errorBirthDateNotValid') ?? '', (value): boolean =>
                value ? moment(today).diff(value) > 0 : true
            ),
        bio: yup.string().max(250, t('errorBioMaxCharacters') ?? '')
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<PersonData>({
        resolver: yupResolver(schema),
        defaultValues: {
            id: props.person?.id ?? '',
            name: props.person?.name ?? '',
            age: props.person?.age ?? '',
            birthDate: props.person?.birthDate ?? '',
            bio: props.person?.bio ?? ''
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
            <Box>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <FormControl fullWidth variant="standard" margin="normal">
                            <TextField label={`${t('firstName')} *`} id="name" variant="standard" {...field} />
                            <FormHelperText error id="error-name">
                                {errors.name?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="age"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <FormControl fullWidth variant="standard" margin="normal">
                            <TextField id="age" label={`${t('age')} *`} {...field} variant="standard" />
                            <FormHelperText error id="error-age">
                                {errors.age?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <FormControl fullWidth variant="standard" margin="normal">
                            <InputLabel htmlFor="birthDate">{`${t('birthDate')} *`}</InputLabel>
                            <Input type="date" id="birthDate" {...field} />
                            <FormHelperText error id="error-birthDate">
                                {errors.birthDate?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    )}
                />

                <Controller
                    name="bio"
                    control={control}
                    render={({ field }): JSX.Element => (
                        <FormControl fullWidth variant="standard" margin="normal">
                            <TextField
                                className={styles['input-scrollbar-hide']}
                                label={t('bio')}
                                id="bio"
                                variant="standard"
                                multiline={true}
                                maxRows={7}
                                {...field}
                            />
                            <FormHelperText error id="error-bio">
                                {errors.bio?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    )}
                />

                <Box>
                    <Button type="submit">{t('save')}</Button>
                    <Button onClick={props.handleClose}>{t('cancel')}</Button>
                </Box>
            </Box>
        </form>
    );
};

export default PersonForm;
