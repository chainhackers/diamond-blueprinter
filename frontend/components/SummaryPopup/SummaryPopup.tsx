/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { ISummaryPopupProps } from './SummaryPopupProps';
import styles from './SummaryPopup.module.scss';

import { useDiamondContext } from '@/contexts';
import { SummaryElement } from './SummaryElement';
export const SummaryPopup: React.FC<ISummaryPopupProps> = () => {
  const { hideSummaryPopup, getSummaryData, selectedFacets } = useDiamondContext();
  const cutDiamondHandler = () => {
    console.log('cut diaomnd');
  };

  const data: {
    add: { methodName: string; groupName: string; address: string }[];
    remove: { methodName: string; groupName: string; address: string }[];
    replace: { methodName: string; groupName: string; address: string }[];
  } = {
    add: [
      {
        methodName: 'someMethod',
        groupName: 'someGroup',
        address: '0x000x0x00x00x00x00x0x00xx00x0x0',
      },
    ],
    replace: [
      {
        methodName: 'someMethod',
        groupName: 'someGroup',
        address: '0x000x0x00x00x00x00x0x00xx00x0x0',
      },
    ],
    remove: [
      {
        methodName: 'someMethod',
        groupName: 'someGroup',
        address: '0x000x0x00x00x00x00x0x00xx00x0x0',
      },
    ],
  };

  // console.log('selectedFacets', selectedFacets);

  const summaryData = getSummaryData(selectedFacets);

  return (
    <div className={styles.container}>
      <div className={styles.shade}></div>
      <div className={styles.dialog} onClick={(event) => event.stopPropagation()}>
        <div className={styles.closeButton} onClick={hideSummaryPopup}>
          <img src='/images/close.png' alt='close' />
        </div>
        <div className={styles.heading}>
          <h3 className={styles.h3}>Summary</h3>
          <div className={styles.cutButton}>
            <button onClick={cutDiamondHandler}>Cut</button>
          </div>
        </div>
        <div className={styles.contains}>
          <div className={styles.heading}>
            <div className={styles.image}>
              <img src='/images/diamond-1.png/' alt='diamond' />
            </div>
            <div className={styles.title}>Diamond cut</div>
            <div className={styles.date}>{new Date().toUTCString()}</div>
            <div className={styles.address}>0x1215991085d541A586F0e1968355A36E58C9b2b4</div>
          </div>
          {summaryData ? (
            <div className={styles.updates}>
              <div className={cn(styles.update, styles.add)}>
                <div className={styles.heading}>Add</div>
                <div className={styles.elements}>
                  {summaryData &&
                    summaryData.add.map((method) => (
                      <SummaryElement key={method.address + method.methodName} {...method} />
                    ))}
                </div>
              </div>
              <div className={cn(styles.update, styles.replace)}>
                <div className={styles.heading}>Replace</div>
                <div className={styles.elements}>
                  {summaryData.replace.map((method) => (
                    <SummaryElement key={method.address + method.methodName} {...method} />
                  ))}
                </div>
              </div>
              <div className={cn(styles.update, styles.remove)}>
                <div className={styles.heading}>Remove</div>
                <div className={styles.elements}>
                  {summaryData.remove.map((method) => (
                    <SummaryElement key={method.address + method.methodName} {...method} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h3 className={styles.h3}>No updates</h3>
          )}
        </div>
      </div>
    </div>
  );
};
