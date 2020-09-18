import {CustomerModel} from "../../shared/models/customer.model";

export const customersMock: CustomerModel[] = [
  {
    id: "1234",
    name: "Riccardo",
    surname: "Maldini",
    email: "test@test.it",
    phone: "331123456",
    address: "Viale della Vittoria, 22",
    deleted: false,
    registered: false,
  },
  {
    id: "1234",
    name: "Matteo",
    surname: "Montesi",
    email: "test@altrotest.it",
    phone: "331123456",
    address: "Viale della Vittoria, 22",
    deleted: false,
    registered: true,
  },
  {
    id: "12343",
    name: "Matteo",
    surname: "Montesi22",
    email: "test@altrotest.it",
    phone: "331123456",
    address: "Viale della Vittoria, 22",
    deleted: false,
    registered: false,
  }
];
