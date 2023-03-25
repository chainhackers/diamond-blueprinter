import { IResultingInterfaceProps } from './ResultingInterfaceProps';
import styles from './ResultingInterface.module.scss';
import { useDiamondContext } from '@/contexts';
export const ResultingInterface: React.FC<IResultingInterfaceProps> = () => {
  const { getSelectedFacetsMethods } = useDiamondContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>Resulting Interface</h3>
      {getSelectedFacetsMethods().map((method, index) => (
        <div
          className={styles.method}
          key={method.name + index}
          style={{ color: `${method.color}` }}
        >
          {method.name}
        </div>
      ))}
    </div>
  );
};
