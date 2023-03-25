import { ISummaryElementProps } from './SummaryElementProps';
import styles from './SummaryElement.module.scss';
import { group } from 'console';
export const SummaryElement: React.FC<ISummaryElementProps> = ({
  methodName,
  group,
  address,
}) => {
  
  const trunccatedAddress = address.slice(0, 12) + '.......' + address.slice(-12);
  return (
    <div className={styles.container}>
      <div className={styles.method}>{methodName}</div>
      <div className={styles.group}>{group}</div>
      <div className={styles.address}>{trunccatedAddress}</div>
    </div>
  );
};
