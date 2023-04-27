import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import PersonForm from '../forms/PersonForm';
import { PersonData } from '../../interfaces/PersonDataInterface';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const FormModal = ({ person, children }: { person?: PersonData; children: React.ReactNode }): JSX.Element => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    return (
        <Box>
            <Button onClick={handleOpen}>{children}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {t('addPersonTitle')}
                    </Typography>
                    <PersonForm handleClose={handleClose} person={person} />
                </Box>
            </Modal>
        </Box>
    );
};
export default FormModal;
