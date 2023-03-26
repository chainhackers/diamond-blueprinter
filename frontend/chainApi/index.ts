import { ethers } from 'ethers';
import { fetchSigner } from '@wagmi/core';

export async function getAbi(address: string) {
  try {
    //const uri = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`;
    const uri = `https://explorer.testnet.mantle.xyz/api?module=contract&action=getabi&address=${address}&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`
    console.log(uri);
    const response = await fetch(uri);
    return response.json().result;
  } catch (error) {
    console.log('getAbi error', error);
  }
}

export async function getContract(address: string) {
  try {
    const signer = await fetchSigner();
    const abi = await getAbi(address);
    console.log(abi);
    console.log(process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY);
    const contract = new ethers.Contract(address, abi, signer!);
    return contract;
  } catch (error) {
    console.log('contract error', error);
  }
}

export async function getTokenMeta(url: string) {
  try {
    const response = await (await fetch(url)).json();
    console.log(response);
  } catch (error) {
    console.error('cant get token metaData', error);
  }
}