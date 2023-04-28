import * as React from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Toolbar,
    Typography,
    Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SelectLng from '../select/SelectLng';

interface Props {
    window?: () => Window;
}
const drawerWidth = 240;

const navItems = [
    {
        link: '/main',
        name: 'main'
    },
    {
        link: '/views',
        name: 'views'
    }
];

export default function DrawerAppBar(props: Props): JSX.Element {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = (): void => {
        setMobileOpen((prevState) => !prevState);
    };
    const { t } = useTranslation();
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ my: 2 }}>
                <Link to="/">EUVIC</Link>
            </Typography>
            <Divider />
            <List sx={{ display: 'flex', flexDirection: 'column' }}>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{ display: 'flex', justifyContent: 'center', p: 1.5 }}>
                            <Link to={item.link}>
                                <Typography>{t(item.name)}</Typography>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
                <Box sx={{ mt: 5 }}>
                    <SelectLng />{' '}
                </Box>
            </List>
        </Box>
    );

    const container = window !== undefined ? (): HTMLElement => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ px: 5, flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                        <Link to="/">EUVIC</Link>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '2', alignItems: 'center' }}>
                        {navItems.map((item) => (
                            <Link to={item.link} key={item.name}>
                                <Button sx={{ color: '#fff', display: 'flex', p: 2 }}>
                                    <Typography sx={{ textTransform: 'capitalize' }}>{t(item.name)}</Typography>
                                </Button>
                            </Link>
                        ))}
                        <Box sx={{ ml: 7 }}>
                            <SelectLng />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'flex', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}>
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}
