import { useTranslation } from 'react-i18next';

const Views = (): JSX.Element => {
    const { t } = useTranslation('common');
    return (
        <div>
            <h2>VIEWS</h2>
        </div>
    );
};
export default Views;
