import {Customer} from "../../shared/models/customer";

export const customersMock: Customer[] = [
  {
    id: "1234",
    name: "Riccardo",
    surname: "Maldini",
    email: "test@test.it",
    phone: "331123456",
    address: "Viale della Vittoria, 22",
    cancelled: false,
    registered: true,
  },
  {
    id: "1234",
    name: "Matteo",
    surname: "Montesi",
    email: "test@altrotest.it",
    phone: "331123456",
    address: "Viale della Vittoria, 22",
    cancelled: false,
    registered: true,
  }
];
