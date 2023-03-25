import { ISummaryElementProps } from './SummaryElementProps';
import styles from './SummaryElement.module.scss';
export const SummaryElement: React.FC<ISummaryElementProps> = () => {
  const address = '0x1215991085d541A586F0e1968355A36E58C9b2b4';
  const trunccatedAddress = address.slice(0, 12) + '.......' + address.slice(-12);
  return (
    <div className={styles.container}>
      <div className={styles.method}>Method name</div>
      <div className={styles.group}>Group name</div>
      <div className={styles.address}>{trunccatedAddress}</div>
    </div>
  );
};
