import {
  IFacet,
  IFacetGroup,
  IMethod,
  IPopupData,
  ISummaryData,
  ISummaryDataElement,
} from '@/types';


import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface IDiamondContextState {
  isPopupShown: boolean;
  isSummaryPopupShown: boolean;
  showPopup: (data: IPopupData) => void;
  showSummaryPopup: () => void;
  popupData: IPopupData | null;
  hidePopup: () => void;
  togglePopup: () => void;
  hideSummaryPopup: () => void;
  facets: IFacet[];
  updateFacet: (facet: IFacet) => void;
  updateSelectedFacets: (facet: IFacet) => void;
  selectedFacets: IFacet[];
  cuttedFacets: IFacet[];
  getSelectedFacetMethodsNames: (facet: IFacet) => string[];
  getSelectedFacetsMethods: () => IMethod[];
  getCutAndSelectedFacetsDiff: () => IFacet[];
  summaryData: ISummaryData | null;
  getSummaryData: (selectedFacet: IFacet[]) => ISummaryData | null;
}

const diamondDefaultContextState: IDiamondContextState = {
  isPopupShown: false,
  showPopup: (data: IPopupData) => undefined,
  isSummaryPopupShown: false,
  showSummaryPopup: () => undefined,
  popupData: null,
  hidePopup: () => undefined,
  togglePopup: () => undefined,
  hideSummaryPopup: () => undefined,
  facets: [],
  updateFacet: (facet: IFacet) => undefined,
  updateSelectedFacets: (facet: IFacet) => undefined,
  selectedFacets: [],
  cuttedFacets: [],
  getSelectedFacetMethodsNames: (facet: IFacet) => [],
  getSelectedFacetsMethods: () => [],
  getCutAndSelectedFacetsDiff: () => [],
  summaryData: null,
  getSummaryData: (selectedFacet: IFacet[]) => null,
};

export const DiamondContext = createContext<IDiamondContextState>(diamondDefaultContextState);

export const useDiamondContext = () => useContext(DiamondContext);

export const DiamondContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPopupShown, setShowPopup] = useState<boolean>(false);
  const [isSummaryPopupShown, setShowSummaryPopup] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<ISummaryData | null>(null);
  const [popupData, setPopupData] = useState<IPopupData | null>(null);
  const [facets, setFacets] = useState<IFacet[]>(testFacets);
  const [selectedFacets, setSelectedFacets] = useState<IFacet[]>([]);
  const [cuttedFacets, setCuttedFacets] = useState<IFacet[]>(testCuttedFacets);

  const showPopup = (data: IPopupData) => {
    setShowPopup(true);
    setPopupData(data);
  };

  const showSummaryPopup = () => {
    setShowPopup(false);
    setShowSummaryPopup(true);
  };

  const updateFacet = (facet: IFacet) => {
    // const upDatedFacets: IFacet[] = facets.map((currentFacet) =>
    //   currentFacet.address === facet.address
    //     ? { ...currentFacet, selectedMethods: facet.selectedMethods }
    //     : currentFacet,
    // );
    // setFacets(upDatedFacets);
  };

  const getSelectedFacetMethodsNames = (facet: IFacet) => {
    const selectedFacet = selectedFacets.find(
      (selectedFacet) => selectedFacet.address === facet.address,
    );
    if (!selectedFacet) return [];
    return selectedFacet.methods.map((method) => method.name);
  };

  const getSelectedFacetsMethods = (): IMethod[] =>
    selectedFacets.flatMap((facet) => facet.methods);

  const getCutAndSelectedFacetsDiff = (): IFacet[] => {
    const difference: any[] = [];
    const summmary: ISummaryData = {
      add: [],
      remove: [],
      replace: [],
    };

    for (const selectedFacet of selectedFacets) {
      const selectedFacetItCut = cuttedFacets.find(
        (cuttedFacet) => cuttedFacet.address === selectedFacet.address,
      );
      if (!selectedFacetItCut) {
        difference.push(selectedFacet);

        const add: ISummaryDataElement[] = selectedFacet.methods.map((method) => ({
          address: selectedFacet.address,
          group: selectedFacet.group ? selectedFacet.group : 'ungrouped',
          methodName: method.name,
        }));
        summmary.add.push(...add);
        break;
      } else {
        console.log('else');
        // const diffMethods = se
      }
    }

    // console.log('difference', difference);
    // console.log('summary', summmary);
    const diff = selectedFacets.filter((selectedFacet) => {
      const selectedFacetInCut = cuttedFacets.find(
        (cuttedFacet) => cuttedFacet.address === selectedFacet.address,
      );

      if (!selectedFacetInCut) return true;
      if (selectedFacetInCut.methods.length !== selectedFacet.methods.length) return true;
      for (const method of selectedFacetInCut.methods) {
        if (!selectedFacet.methods.includes(method)) return true;
      }
      return false;
    });

    // setSummaryData(summmary);

    return diff;
  };

  const getSummaryData = (selectedFacets: IFacet[]): ISummaryData | null => {
    const summary: ISummaryData = {
      add: [],
      remove: [],
      replace: [],
    };

    console.log('selectedFacets', selectedFacets);
    console.log('cuttedFacets', cuttedFacets);

    //if previosuly cutted facet removed
    for (const cuttedFacet of cuttedFacets) {
      const index = selectedFacets.findIndex(
        (selectedFacet) => selectedFacet.address === cuttedFacet.address,
      );
      if (index < 0) {
        console.log('facet removed', cuttedFacet);
        const cuttedFacetMethods = cuttedFacet.methods;
        for (const cuttedFacetMethod of cuttedFacetMethods) {
          let replaced: boolean = false;
          for (const selectedFacet of selectedFacets) {
            const method = selectedFacet.methods.find(
              (selectedFacetMethod) => selectedFacetMethod.name === cuttedFacetMethod.name,
            );
            if (!!method) {
              console.log('method replaced');
              summary.replace.push({
                address: selectedFacet.address,
                group: selectedFacet.group ?? 'ungrouped',
                methodName: cuttedFacetMethod.name,
              });
              replaced = true;
            }
          }
          if (!replaced) {
            summary.remove.push({
              address: cuttedFacet.address,
              group: cuttedFacet.group ?? 'ungrouped',
              methodName: cuttedFacetMethod.name,
            });
          }
        }
      }
    }

    for (const selectedFacet of selectedFacets) {
      const cuttedFacet = cuttedFacets.find(
        (cuttedFacet) => cuttedFacet.address === selectedFacet.address,
      );
      //if new facet added
      if (!cuttedFacet) {
        console.log('new facet added', selectedFacet);
        for (const selectedFacetMethod of selectedFacet.methods) {
          let replaced: boolean = false;
          for (const cuttedFacet of cuttedFacets) {
            const method = cuttedFacet.methods.find(
              (cuttedFacetMethod) => cuttedFacetMethod.name === selectedFacetMethod.name,
            );
            if (!!method) {
              replaced = true;
              !summary.replace.find((element) => element.methodName === method.name) &&
                summary.replace.push({
                  address: selectedFacet.address,
                  group: selectedFacet.group ?? 'ungrouped',
                  methodName: selectedFacetMethod.name,
                });
            }
          }
          if (!replaced) {
            summary.add.push({
              address: selectedFacet.address,
              group: selectedFacet.group ?? 'ungrouped',
              methodName: selectedFacetMethod.name,
            });
          }
        }
        continue;
      }
      console.log('exits');
      const cuttedMethods = cuttedFacets.flatMap((facet) => facet.methods);
      for (const selectedFacetMethod of selectedFacet.methods) {
        const index = cuttedFacet.methods.findIndex(
          (method) => method.name === selectedFacetMethod.name,
        );
        if (index < 0) {
          const inCuttedIndex = cuttedMethods.findIndex(
            (method) => method.name === selectedFacetMethod.name,
          );
          if (inCuttedIndex >= 0) {
            !summary.replace.find((element) => element.methodName === selectedFacetMethod.name) &&
              summary.replace.push({
                address: selectedFacet.address,
                group: selectedFacet.group ?? 'ungrouped',
                methodName: selectedFacetMethod.name,
              });
            continue;
          }
          summary.add.push({
            address: selectedFacet.address,
            group: selectedFacet.group ?? 'ungrouped',
            methodName: selectedFacetMethod.name,
          });
        }
      }
      const selectedMethods = selectedFacets.flatMap((facet) => facet.methods);
      for (const cuttedFacetMethod of cuttedFacet.methods) {
        const index = selectedMethods.findIndex((method) => method.name === cuttedFacetMethod.name);
        if (index < 0) {
          summary.remove.push({
            address: cuttedFacet.address,
            group: cuttedFacet.group ?? 'ungrouped',
            methodName: cuttedFacetMethod.name,
          });
        }
      }
    }

    // if one of previously cutted facet removed
    // for (const cuttedFacet of cuttedFacets) {
    //   const cuttedFacetInSelected = selectedFacets.find(
    //     (selectedFacet) => selectedFacet.address === cuttedFacet.address,
    //   );
    //   if (!cuttedFacetInSelected) {
    //     console.log('removed');
    //     const removed: ISummaryDataElement[] = cuttedFacet.methods.map((method) => ({
    //       address: cuttedFacet.address,
    //       group: cuttedFacet.group ? cuttedFacet.group : 'ungrouped',
    //       methodName: method.name,
    //     }));
    //     summary.remove.push(...removed);
    //   }
    // }

    // for (const selectedFacet of selectedFacets) {
    //   //   // console.log('selectedFacet', selectedFacet);
    //   const selectedFacetInCut = cuttedFacets.find(
    //     (cutFacet) => cutFacet.address === selectedFacet.address,
    //   );

    //   // If selected facet is not in cutted facet
    //   if (!selectedFacetInCut) {
    //     // console.log('added');

    //     // Check if selected facet method is on one of cutted facets
    //     for (const selectedMethod of selectedFacet.methods) {
    //       console.log('selectedMethod', selectedMethod);

    //       // if cutted facets methods has seletctedMethod - to be replaced
    //       let toBeReplaced: boolean = false;

    //       for (const cuttedFacet of cuttedFacets) {
    //         const cutfacedMethodIndex = cuttedFacet.methods.findIndex(
    //           (cuttedMethod) => cuttedMethod.name === selectedMethod.name,
    //         );
    //         // if cutted facets methods has seletctedMethod - to be replaced
    //         if (cutfacedMethodIndex >= 0) {
    //           toBeReplaced = true;
    //           summary.replace.push({
    //             address: selectedFacet.address,
    //             group: selectedFacet.group ? selectedFacet.group : 'ungrouped',
    //             methodName: selectedMethod.name,
    //           });
    //           break;
    //         }
    //       }

    //       // if cutted facets methods hasno  seletctedMethod - to be added
    //       if (!toBeReplaced) {
    //         summary.add.push({
    //           address: selectedFacet.address,
    //           group: selectedFacet.group ? selectedFacet.group : 'ungrouped',
    //           methodName: selectedMethod.name,
    //         });
    //       }
    //     }
    //   }

    //   // If selected facet is in cutted facet
    //   if (!!selectedFacetInCut) {
    //     // console.log('selectedFacetInCut in cut', selectedFacetInCut.methods);
    //     // console.log('selectedFacetInCut select', selectedFacet.methods);
    //     // console.log('selectedFacetInCut');

    //     // if methods removed
    //     let isRemoved: boolean = true;

    //     for (const selectedFacetInCutmethod of selectedFacetInCut.methods) {
    //       const selectedFacetInCutmethodIndex = selectedFacet.methods.findIndex(
    //         (method) => method.name === selectedFacetInCutmethod.name,
    //       );
    //       // console.log(selectedFacetInCutmethodIndex);

    //       if (selectedFacetInCutmethodIndex >= 0) {
    //         continue;
    //       }
    //       // console.log('revmoe');
    //       summary.remove.push({
    //         address: selectedFacet.address,
    //         group: selectedFacet.group ? selectedFacet.group : 'ungrouped',
    //         methodName: selectedFacetInCutmethod.name,
    //       });
    //     }

    //     for (const selectedFacetMethod of selectedFacet.methods) {
    //       const selectedFacetMethodIndex = selectedFacetInCut.methods.findIndex(
    //         (method) => method.name === selectedFacetMethod.name,
    //       );
    //       if (selectedFacetMethodIndex >= 0) {
    //         continue;
    //       }

    //       summary.add.push({
    //         address: selectedFacet.address,
    //         group: selectedFacet.group ? selectedFacet.group : 'ungrouped',
    //         methodName: selectedFacetMethod.name,
    //       });
    //     }
    //   }
    // }
    return Object.values(summary).flat().length === 0 ? null : summary;
  };

  const updateSelectedFacets = (updatedFacet: IFacet) => {
    // console.log('update', updatedFacet);
    // console.log('selectedFacets', selectedFacets);
    if (updatedFacet.methods.length === 0) {
      setSelectedFacets((prev) => prev.filter((facet) => facet.address !== updatedFacet.address));
      return;
    }

    if (
      selectedFacets.findIndex((selectedFacet) => selectedFacet.address === updatedFacet.address) <
      0
    ) {
      // for (const selectedFacet of selectedFacets) {
      //   const index = selectedFacet.methods.findIndex((method) => method.name === )
      // }
      for (const updatedFacetMethod of updatedFacet.methods) {
        for (const selectedFacet of selectedFacets) {
          const index = selectedFacet.methods.findIndex(
            (method) => method.name === updatedFacetMethod.name,
          );
          if (index >= 0) {
            selectedFacet.methods.splice(index, 1);
          }
        }
      }

      // console.log('selectedFacets', selectedFacets);

      setSelectedFacets((prev) =>
        [...prev, updatedFacet].filter((facet) => facet.methods.length > 0),
      );
      return;
    }

    // console.log('has in selected');
    for (const updatedFacetMethod of updatedFacet.methods) {
      //   for (const selectedFacet of selectedFacets) {
      //     const index = selectedFacet.methods.findIndex(
      //       (method) => method.name === updatedFacetMethod.name,
      //     );
      //     if (index >= 0) {
      //       selectedFacet.methods.splice(index, 1);
      //     }
      //   }
    }

    const updatedSelectedFacets2 = selectedFacets
      .map((facet) => {
        const updatedFacetMethods = updatedFacet.methods;

        if (facet.address === updatedFacet.address) {
          return { ...facet, methods: updatedFacet.methods };
        }

        // console.log('facet', facet);

        for (const updatedFacetMethod of updatedFacetMethods) {
          const index = facet.methods.findIndex(
            (facetMethod) => facetMethod.name === updatedFacetMethod.name,
          );
          if (index >= 0) facet.methods.splice(index, 1);
        }
        // console.log('facet', facet);
        return { ...facet };
      })
      .filter((facet) => facet.methods.length > 0);

    const updatedSelectedFacets = selectedFacets.map((facet) =>
      facet.address === updatedFacet.address ? updatedFacet : facet,
    );

    // console.log('updatedSelectedFacets', updatedSelectedFacets);
    // console.log('updatedSelectedFacets2', updatedSelectedFacets2);

    setSelectedFacets(updatedSelectedFacets2);
  };

  useEffect(() => {
    const clonedFacest = cuttedFacets.map((facet) => {
      const methods = facet.methods.map((method) => ({ ...method }));

      return { ...facet, methods };
    });
    setSelectedFacets(clonedFacest);
  }, [cuttedFacets]);

  const value: IDiamondContextState = {
    isSummaryPopupShown,
    showSummaryPopup,
    cuttedFacets,
    selectedFacets,
    facets,
    popupData,
    isPopupShown,
    showPopup,
    hidePopup: () => setShowPopup(false),
    togglePopup: () => setShowPopup(!isPopupShown),
    hideSummaryPopup: () => setShowSummaryPopup(false),
    updateFacet,
    updateSelectedFacets,
    getSelectedFacetMethodsNames,
    getSelectedFacetsMethods,
    getCutAndSelectedFacetsDiff,
    summaryData,
    getSummaryData,
  };
  return <DiamondContext.Provider value={value}>{children}</DiamondContext.Provider>;
};

const testCuttedFacets: IFacet[] = [
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F9',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      // { name: 'method2', color: 'blue' },
      // { name: 'method3', color: 'green' },
    ],
    // selectedMethods: ['method1', 'method3'],
  },
  {
    name: 'MinecraftLike',
    address: '0x12191085d541A586F0e1968355A36E58C9b2b4',
    methods: [
      { name: 'method1000', color: 'red' },
      // { name: 'method2000', color: 'blue' },
      { name: 'method3000', color: 'green' },
    ],
    // selectedMethods: [],
    group: 'Fight',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d',
    group: 'Craft',
    methods: [
      // { name: 'method1', color: 'red' },
      // { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: [],
  },
];

const testSelectedFacets: IFacet[] = [
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F9',
    group: 'Craft',
    methods: [
      { name: 'method111', color: 'red' },
      { name: 'method222', color: 'blue' },
      // { name: 'method333', color: 'green' },
    ],
    // selectedMethods: ['method1', 'method3'],
  },
];

const testFacets: IFacet[] = [
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F9',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: ['method1', 'method3'],
  },
  {
    name: 'Simple',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method22', color: 'blue' },
    ],
    // selectedMethods: [],
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25',
    group: 'Craft',
    methods: [
      { name: 'method111', color: 'red' },
      { name: 'method222', color: 'blue' },
      { name: 'method333', color: 'green' },
    ],
    // selectedMethods: ['method2'],
  },
  {
    name: 'MinecraftLike',
    address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
    group: 'Craft',
    methods: [
      { name: 'method1111', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3333', color: 'green' },
    ],
    // selectedMethods: [],
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D464d',
    group: 'Craft',
    methods: [
      { name: 'method1', color: 'red' },
      { name: 'method2', color: 'blue' },
      { name: 'method3', color: 'green' },
    ],
    // selectedMethods: [],
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D4',
    methods: [],
    // selectedMethods: [],
    group: 'Movement',
  },
  {
    name: 'MinecraftLike',
    address: '0x1215991085d541A586F0e1968355A3',
    methods: [],
    // selectedMethods: [],
    group: 'Movement',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950bD0F6B47D464d25F91',
    methods: [],
    // selectedMethods: [],
    group: 'Movement',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d12849e950f89bD0F6B47D464d25F91',
    methods: [],
    // selectedMethods: [],
    group: 'Fight',
  },
  {
    name: 'MinecraftLike',
    address: '0x12191085d541A586F0e1968355A36E58C9b2b4',
    methods: [
      { name: 'method1000', color: 'red' },
      { name: 'method2000', color: 'blue' },
      { name: 'method3000', color: 'green' },
    ],
    // selectedMethods: [],
    group: 'Fight',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B47D64d25F91',
    methods: [],
    // selectedMethods: [],
    group: 'Fight',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F647D464d25F91',
    methods: [],
    // selectedMethods: [],
    group: 'Map',
  },
  {
    name: 'MinecraftLike',
    address: '0x1215991085d541A86F0e1968355A36E58C9b2b4',
    methods: [],
    // selectedMethods: [],
    group: 'Map',
  },
  {
    name: 'NOP - everything disallowed',
    address: '0xDb0b11d1281da49e950f89bD0F6B4huD464d25F91',
    methods: [
      { name: 'method1899', color: 'red' },
      { name: 'method2899', color: 'blue' },
      { name: 'method3899', color: 'green' },
    ],
    // selectedMethods: [],
    group: 'Map',
  },
];

// const facetGroups: IFacetGroup[] = [
//   {
//     icon: '🛠',
//     name: 'Craft',
//     facets: [
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//           { name: 'method3', color: 'green' },
//         ],
//         selectedMethods: ['method1', 'method3'],
//       },
//       {
//         name: 'Simple',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//         ],
//         selectedMethods: [],
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//           { name: 'method3', color: 'green' },
//         ],
//         selectedMethods: ['method2'],
//       },
//       {
//         name: 'MinecraftLike',
//         address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//           { name: 'method3', color: 'green' },
//         ],
//         selectedMethods: [],
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         group: 'Craft',
//         methods: [
//           { name: 'method1', color: 'red' },
//           { name: 'method2', color: 'blue' },
//           { name: 'method3', color: 'green' },
//         ],
//         selectedMethods: [],
//       },
//     ],
//   },
//   {
//     icon: '🚶‍♂️️',
//     name: 'Movement',
//     facets: [
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Movement',
//       },
//       {
//         name: 'MinecraftLike',
//         address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
//         methods: [],
//         selectedMethods: [],
//         group: 'Movement',
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Movement',
//       },
//     ],
//   },
//   {
//     icon: '⚔️️️',
//     name: 'Fight',
//     facets: [
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Fight',
//       },
//       {
//         name: 'MinecraftLike',
//         address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
//         methods: [],
//         selectedMethods: [],
//         group: 'Fight',
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Fight',
//       },
//     ],
//   },
//   {
//     icon: '🗺️',
//     name: 'Maps',
//     facets: [
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Map',
//       },
//       {
//         name: 'MinecraftLike',
//         address: '0x1215991085d541A586F0e1968355A36E58C9b2b4',
//         methods: [],
//         selectedMethods: [],
//         group: 'Map',
//       },
//       {
//         name: 'NOP - everything disallowed',
//         address: '0xDb0b11d1281da49e950f89bD0F6B47D464d25F91',
//         methods: [],
//         selectedMethods: [],
//         group: 'Map',
//       },
//     ],
//   },
// ];
