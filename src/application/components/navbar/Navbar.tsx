import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <Link to={item.link}>{t(item.name)}</Link>
                        </ListItemButton>
                    </ListItem>
                ))}
                <SelectLng />
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
                        sx={{ px: 5, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <Link to="/">EUVIC</Link>
                    </Typography>
                    <Box sx={{ px: 5, display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.name} sx={{ color: '#fff' }}>
                                <Link to={item.link}>{t(item.name)}</Link>
                            </Button>
                        ))}
                        <SelectLng />
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
                        display: { xs: 'block', sm: 'none' },
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
