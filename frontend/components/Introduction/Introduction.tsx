/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IIntroductionProps } from './IntroductionProps';
import styles from './Introduction.module.scss';

export const Introduction: React.FC<IIntroductionProps> = () => {
  return (
    <div className={styles.introduction}>
      <h2 className={styles.title}>Introducing the Diamond Storage Area</h2>
      <ul className={styles.cards}>
      <li className={styles.card}>
        <p>View Deployed Facets: Explore the facet contracts registered with your diamond, whether they are new versions of existing systems or entirely new ones.</p>
      </li>
      <li className={styles.card}>1</li>
      <li className={styles.card}>1</li>
      </ul>
      <h2 className={styles.title}>Introducing the Function Area</h2>
    </div>
    
  );
};
