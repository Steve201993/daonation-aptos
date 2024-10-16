import { NFT } from './nft';

export interface CharityEvent {
  id: Number;
  eventId: Number;
  daoId: Number;
  Title: string;
  Description: string;
  Budget: number;
  End_Date: string;
  Time?: string;
  TimeFormat?: string;
  wallet: string;
  UserId: Number;
  logo: string;
  type: string;
  reached: number;
  amountOfNFTs: number;
  status: string;
  isOwner?: boolean;
  NFTS?: NFT[];
  eventType: 'auction';
}
