export interface IDriver {
  id: number;
  name: string;
  image_url: string | null;
  mobile_number: string;
  origin_location: string | null;
  current_location: string | null;
  mother_name: string | null;
  mother_contact: string | null;
  father_name: string | null;
  father_contact: string | null;
  settling_home_details: string | null;
  fingerprint_data: string | null;
  documentType: string | null;
  documentNumber: string | null;
  documentUpload: string | null;
}

export interface IDriverDTO {
  mobile_number: string;
  name: string;
  current_location?: string;
  origin_location?: string;
  father_name?: string;
  father_contact?: string;
  mother_name?: string;
  mother_contact?: string;
  settling_home_details?: string;
  fingerprint_data?: string;
  image_url?: string;
  documentType?: string;
  documentNumber?: string;
  documentUpload?: string;
}
