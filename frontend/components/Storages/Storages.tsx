/* eslint-disable @next/next/no-img-element */
import { IStoragesProps } from './StoragesProps';
import styles from './Storages.module.scss';
import { Storage } from './Storage/Storage';
import { IStoragaData } from '@/types';
export const Storages: React.FC<IStoragesProps> = ({ storages }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Storages</h2>
      <div className={styles.contains}>
        <div className={styles.storages}>
          <div className={styles.background}>
            <img className={styles.img} src='/images/chest.png' alt='half-diamond'></img>
          </div>
          {storages.map((data) => (
            <Storage key={data.name} {...data} />
          ))}
        </div>
        <div className={styles.cutButton}>
          <button>
            <div>Download ZIP</div>
            {/* <div> */}
            <img src='/images/downloand-icon.png' alt='dowload'></img>
            {/* </div> */}
          </button>
        </div>
        <div className={styles.zipButton}>
          <button>
            <div>View history</div>
            {/* <div> */}
            <img src='/images/history-icon.png' alt='dowload'></img>
            {/* </div> */}
          </button>
        </div>
      </div>
    </div>
  );
};
