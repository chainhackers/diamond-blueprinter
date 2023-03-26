/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IIntroductionProps } from './IntroductionProps';
import styles from './Introduction.module.scss';

import cn from 'classnames';

export const Introduction: React.FC<IIntroductionProps> = () => {
  return (
    <div className={styles.introduction}>
      <h2 className={styles.title}>Introducing the Diamond Storage Area</h2>
      {/* <ul className={styles.cards}>
      <li className={styles.card}>
        <p>View Deployed Facets: Explore the facet contracts registered with your diamond, whether they are new versions of existing systems or entirely new ones.</p>
      </li>
      <li className={styles.card}>1</li>
      <li className={styles.card}>1</li>
      </ul> */}

      <div className={styles.cards}>
        <div className={styles.img1}>
          <img src='/images/thing-1.png' alt='thing1' />
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>👀</div>
          <div className={styles.text}>
            View Deployed Facets: Explore the facet contracts registered with your diamond, whether
            they are new versions of existing systems or entirely new ones.
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>🔗</div>
          <div className={styles.text}>
            Manage Functions: Add, replace, or remove facet functions, and update your ERC-2535
            diamond in one transaction.
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>🛠</div>
          <div className={styles.text}>
            Manage Functions: Add, replace, or remove facet functions, and update your ERC-2535
            diamond in one transaction.
          </div>
        </div>
      </div>
      <div className={styles.inter}>
        Experience the power and flexibility of the Facets Area for ERC-2535 Diamonds.
      </div>

      <h2 className={styles.title}>Introducing the Function Area</h2>
      <div className={cn(styles.cards, styles.four)}>
        <div className={styles.img2}>
          <img src='/images/thing-2.png' alt='thing2' />
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>👀</div>
          <div className={styles.text}>
            View Deployed Facets: Explore the facet contracts registered with your diamond, whether
            they are new versions of existing systems or entirely new ones.
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>🔀</div>
          <div className={styles.text}>
            View Deployed Facets: Explore the facet contracts registered with your diamond, whether
            they are new versions of existing systems or entirely new ones.
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>📱</div>
          <div className={styles.text}>
            View Deployed Facets: Explore the facet contracts registered with your diamond, whether
            they are new versions of existing systems or entirely new ones.
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>💠</div>
          <div className={styles.text}>
            View Deployed Facets: Explore the facet contracts registered with your diamond, whether
            they are new versions of existing systems or entirely new ones.
          </div>
        </div>
      </div>
      <div className={styles.inter}>
        Discover the convenience and versatility of the Functions Area for ERC-2535 Diamonds
      </div>
    </div>
  );
};
