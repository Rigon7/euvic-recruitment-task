import { createTheme } from '@mui/material';

const globalTheme = createTheme({
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }
            }
        }
    }
});
export default globalTheme;
