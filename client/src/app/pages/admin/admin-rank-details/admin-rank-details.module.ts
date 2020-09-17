import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {AppRoutingModule} from "../../../app-routing.module";
import {AdminRankDetailsComponent} from "./admin-rank-details.component";
import {SalesSelectorComponent} from "./sales-selector/sales-selector.component";



@NgModule({
  declarations: [
    AdminRankDetailsComponent,
    SalesSelectorComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AdminRankDetailsComponent
  ]
})
export class AdminRankDetailsModule { }
