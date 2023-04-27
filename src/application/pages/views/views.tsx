import { useTranslation } from 'react-i18next';

const Views = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t('views')}</h2>
        </div>
    );
};
export default Views;
