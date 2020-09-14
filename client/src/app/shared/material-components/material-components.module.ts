import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatBadgeModule} from "@angular/material/badge";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DomSanitizer} from "@angular/platform-browser";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  exports: [
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatBadgeModule,
    MatTooltipModule,
  ]
})
export class MaterialComponentsModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg')
    );
    matIconRegistry.addSvgIcon('new-booking',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/custom-icons/new-booking.svg')
    );
  }
}
