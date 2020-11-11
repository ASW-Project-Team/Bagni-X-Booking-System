import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {SharedModule} from "../../../shared/shared.module";
import {AppRoutingModule} from "../../../app-routing.module";
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { ModifyAccountComponent } from './modify-account/modify-account.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ModifyPasswordComponent,
    ModifyAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    ProfileComponent,
    ModifyPasswordComponent,
    ModifyAccountComponent
  ]
})
export class ProfileModule { }
