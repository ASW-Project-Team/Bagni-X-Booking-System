import {CustomerModel} from "./customer.model";

export interface AdminModel {
  id?: string;
  username: string;
  password?: string;
  root: boolean;
  jwt?: string;
}

export class Admin implements AdminModel {
  username: string;
  id: string;
  jwt: string;
  password: string;
  root: boolean;

  constructor(model: AdminModel) {
    this.username = model.username;
    this.id = model.id;
    this.jwt = model.jwt;
    this.root = model.root;
    this.password = model.password;
  }
}
