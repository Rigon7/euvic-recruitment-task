import { Box } from '@mui/material';

import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store/store';
import { PersonData } from '../../interfaces/PersonDataInterface';

const Views = (): JSX.Element => {
    const peopleData: PersonData[] = useSelector((state: StoreState) => state.people.people);

    return (
        <Box>
            <ResponsiveGrid data={peopleData} />
        </Box>
    );
};

export default Views;
