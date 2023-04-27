import * as React from 'react';
import {
    alpha,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deletePerson } from '../../redux/features/PersonReducer';
import { PersonData } from '../../interfaces/PersonDataInterface';
import { StoreState } from '../../redux/store/store';
import FormModal from '../modal/FormModal';

interface TableRowData extends PersonData {
    actions?: string;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof TableRowData;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'firstName'
    },
    {
        id: 'age',
        numeric: true,
        disablePadding: false,
        label: 'age'
    },
    {
        id: 'birthDate',
        numeric: true,
        disablePadding: false,
        label: 'birthDate'
    },
    {
        id: 'bio',
        numeric: false,
        disablePadding: false,
        label: 'bio'
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'actions'
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps): JSX.Element {
    const { t } = useTranslation();
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}>
                        {t(headCell.label)}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    selected: readonly string[];
    setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps): JSX.Element {
    const { selected, setSelected } = props;
    const numSelected = selected.length;
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const handleDeleteSelected = (): void => {
        selected.forEach((element) => {
            dispatch(deletePerson(element));
            setSelected([]);
        });
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}>
            {numSelected > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDeleteSelected}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                        {numSelected} {t('selected')}
                    </Typography>
                </Box>
            )}
        </Toolbar>
    );
}

export default function EnhancedTable(): JSX.Element {
    const rows: TableRowData[] = useSelector((state: StoreState) => state.people.people);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { t } = useTranslation();

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string): void => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: string): boolean => selected.indexOf(id) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const dispatch = useDispatch();
    const handleDeleteSingleRow = (event: React.MouseEvent<unknown>, id: string): void => {
        dispatch(deletePerson(id));
        setSelected([]);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ alignItems: 'center' }}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event): void => handleClick(event, row.id)}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.age}</TableCell>
                                        <TableCell align="center">{row.birthDate}</TableCell>
                                        <TableCell align="left">{row.bio}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text" aria-label="text button group">
                                                <FormModal person={rows[index]}>{t('edit')}</FormModal>
                                                <Button onClick={(event): void => handleDeleteSingleRow(event, row.id)}>
                                                    {t('delete')}
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows
                                    }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', allignItems: 'center' }}>
                    <EnhancedTableToolbar selected={selected} setSelected={setSelected} />

                    <TablePagination
                        sx={{ display: 'flex', allignItems: 'center' }}
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={t('rowsPerPage')}
                    />
                </Box>
            </Paper>
        </Box>
    );
}
