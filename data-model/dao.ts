export interface UserInfo{
  id: number;
  full_name: string;
  email: string;
  img_ipfs: string;
  wallet_type: string;
  wallet_address: string;
}

export interface Dao {
  daoId: number;
  Title: string;
  Start_Date: string;
  logo: string;
  wallet: string;
  recievewallet?: string;
  recievetype?: string;
  SubsPrice: string;
  user_id: string;
  user_info: UserInfo;
  customUrl: string;
  brandingColor: string;
}
