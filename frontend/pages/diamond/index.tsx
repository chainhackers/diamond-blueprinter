import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/DiamondPage.module.scss';
import { Diamond, FacetPopup, Facets, Storages } from '@/components';
import { IFacet, IStoragaData } from '@/types';
import { useDiamondContext } from '@/contexts';
export default function Page1() {
  const router = useRouter();
  // console.log(router);
  const { query } = router;

  const { contract } = query;

  const storages: IStoragaData[] = [
    {
      logo: '📦',
      name: 'Smashcraft.Backpack.Storage',
      description: '💠 Simple(Movement)',
    },
    {
      logo: '🧭',
      name: 'Smashcraft.Worldmap.Storage',
      // description: '💠 Simple(Movement)',
    },
    {
      logo: '📦',
      name: 'Smashcraft.CraftReceipt.Storage',
      description: '💠 Simple(Movement)',
    },
  ];

  // const facet: IFacet = {
  //   name: 'MinecraftLike',
  //   address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
  //   methods: [
  //     { name: 'method1', color: 'red' },
  //     { name: 'method2', color: 'green' },
  //     { name: 'method3', color: 'black' },
  //     { name: 'method4', color: 'blue' },
  //     { name: 'method5', color: 'orange' },
  //     { name: 'method6', color: 'pink' },
  //   ],
  //   storages: [
  //     {
  //       logo: '📦',
  //       name: 'Smashcraft.Backpack.Storage',
  //       // description: '💠 Simple(Movement)',
  //     },
  //     {
  //       logo: '🧭',
  //       name: 'Smashcraft.Worldmap.Storage',
  //       // description: '💠 Simple(Movement)',
  //     },
  //     {
  //       logo: '📦',
  //       name: 'Smashcraft.CraftReceipt.Storage',
  //       // description: '💠 Simple(Movement)',
  //     },
  //   ],
  // };

  const { isPopupShown } = useDiamondContext();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        {isPopupShown && <FacetPopup />}
        <div className={styles.gridContainer}>
          <Storages storages={storages} />
          <Diamond />
          <Facets />
        </div>
      </main>
    </>
  );
}
