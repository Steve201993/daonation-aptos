export interface ApiCommunity {
  id: number;
  subdomain: string;
  template: string;
  brandingColor: string;
  name: string;
  imageUrl: string;
  description: string;
  apsosReferenceId: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
