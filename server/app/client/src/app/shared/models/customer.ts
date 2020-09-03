export interface Customer {
  id?: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string
  cancelled?: boolean;
  registered?: boolean;
  jwt?: string;
}
