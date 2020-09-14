export interface AdminModel {
  id?: string;
  username: string;
  password?: string;
  root: boolean;
  jwt?: string;
}
