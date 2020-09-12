export interface CustomerModel {
  id?: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string
  deleted?: boolean;
  registered?: boolean;
  jwt?: string;
}
