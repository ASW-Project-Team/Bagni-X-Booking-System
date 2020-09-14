import {AdminModel} from "../../shared/models/admin.model";

export const adminsMocks: AdminModel[] = [
  {
    id: "1234",
    username: "test",
    root: false,
  },
  {
    id: "5678",
    username: "root",
    root: true,
  }
];
