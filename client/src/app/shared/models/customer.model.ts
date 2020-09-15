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

export class Customer implements CustomerModel {
  address: string;
  deleted: boolean;
  email: string;
  id: string;
  jwt: string;
  name: string;
  password: string;
  phone: string;
  registered: boolean;
  surname: string;

  constructor(model: CustomerModel) {
    this.address = model.address;
    this.deleted = model.deleted;
    this.email = model.email;
    this.id = model.id;
    this.jwt = model.jwt;
    this.name = model.name;
    this.password = model.password;
    this.phone = model.phone;
    this.registered = model.registered;
    this.surname = model.surname;
  }
}
