import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {AppRoutingModule} from "../../../app-routing.module";
import { AdminModifyPasswordComponent } from './admin-modify-password/admin-modify-password.component';
import {AdminProfileComponent} from "./admin-profile.component";
import {AdminModifyAccountComponent} from "./admin-modify-account/admin-modify-account.component";
import { AdminCreateAccountComponent } from './admin-create-account/admin-create-account.component';
import { AdminRemoveAccountComponent } from './admin-remove-account/admin-remove-account.component';


@NgModule({
  declarations: [
    AdminProfileComponent,
    AdminModifyPasswordComponent,
    AdminModifyAccountComponent,
    AdminCreateAccountComponent,
    AdminRemoveAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AdminProfileComponent,
    AdminModifyPasswordComponent,
    AdminModifyAccountComponent,
    AdminCreateAccountComponent,
    AdminRemoveAccountComponent
  ]
})
export class AdminProfileModule { }
