import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainAppbarComponent} from "./appbars/main-appbar/main-appbar.component";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {CustomerMainAppbarComponent} from "./appbars/customer-main-appbar/customer-main-appbar.component";
import {NestedAppbarComponent} from "./appbars/nested-appbar/nested-appbar.component";
import {BookingCardComponent} from "./booking-card/booking-card.component";
import {BookingStateComponent} from "./booking-state/booking-state.component";
import {BookingStateExtendedComponent} from "./booking-state-extended/booking-state-extended.component";
import {BookingSummaryComponent} from "./booking-summary/booking-summary.component";
import {FabComponent} from "./fab/fab.component";
import {FooterComponent} from "./footer/footer.component";
import {ImgLandscapeComponent} from "./img-landscape/img-landscape.component";
import {LoadingScreenComponent} from "./loading-screen/loading-screen.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {SalableCardComponent} from "./salable-card/salable-card.component";
import {SettingsListItemComponent} from "./settings-list-item/settings-list-item.component";
import {AppRoutingModule} from "../../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialComponentsModule} from "../material-components/material-components.module";
import {PipesModule} from "../pipes/pipes.module";
import {AdminMainAppbarComponent} from "./appbars/admin-main-appbar/admin-main-appbar.component";


@NgModule({
  declarations: [
    MainAppbarComponent,
    AlertDialogComponent,
    CustomerMainAppbarComponent,
    NestedAppbarComponent,
    BookingCardComponent,
    BookingStateComponent,
    BookingStateExtendedComponent,
    BookingSummaryComponent,
    FabComponent,
    FooterComponent,
    ImgLandscapeComponent,
    LoadingScreenComponent,
    NewsCardComponent,
    SalableCardComponent,
    SettingsListItemComponent,
    AdminMainAppbarComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    PipesModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    AlertDialogComponent,
    CustomerMainAppbarComponent,
    NestedAppbarComponent,
    BookingCardComponent,
    BookingStateComponent,
    BookingStateExtendedComponent,
    BookingSummaryComponent,
    FabComponent,
    FooterComponent,
    ImgLandscapeComponent,
    LoadingScreenComponent,
    NewsCardComponent,
    SalableCardComponent,
    SettingsListItemComponent,
    AdminMainAppbarComponent
  ]
})
export class SharedComponentsModule { }
