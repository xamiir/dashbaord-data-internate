export interface IOwner {
  id: number;
  name: string;
  mobile_number: string;
  image_url: string | null;
  documentType: string | null;
  documentNumber: string | null;
  documentUpload: string | null;
}

export interface IOwnerDTO {
  mobile_number: string;
  name: string;
  documentType?: string;
  documentNumber?: string;
  documentUpload?: string;
}
