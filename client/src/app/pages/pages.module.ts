import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerPagesModule} from "./customer/customer-pages.module";
import {AdminPagesModule} from "./admin/admin-pages.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminPagesModule,
    CustomerPagesModule,
  ],
  exports: [
    CustomerPagesModule,
    AdminPagesModule
  ]
})
export class PagesModule { }
