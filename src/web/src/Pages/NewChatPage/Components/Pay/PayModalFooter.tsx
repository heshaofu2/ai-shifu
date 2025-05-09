import { memo } from 'react';
import styles from './PayModalFooter.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const PayModalFooter = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.protocolWrapper, className)}>
      <div className={styles.virtualProductDesc}>
        <div className={styles.descTitle}>{t('pay.virtualProductDesc')}</div>
        <div className={styles.descPoint}>{t('pay.virtualProductPoint1')}</div>
        <div className={styles.descPoint}>
          <a
            className={styles.protocolLink}
            href="/useragreement"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            {t('pay.modelServiceAgreement')}
          </a>
          <a
            className={styles.protocolLink}
            href="/privacypolicy"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            {t('pay.userPrivacyPolicy')}
          </a>
        </div>
        <div className={styles.descPoint}>{t('pay.virtualProductPoint2')}</div>
      </div>
    </div>
  );
};

export default memo(PayModalFooter);
