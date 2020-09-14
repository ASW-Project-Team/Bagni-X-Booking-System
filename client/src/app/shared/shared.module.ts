import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponentsModule} from "./material-components/material-components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedComponentsModule} from "./components/shared-components.module";
import {PipesModule} from "./pipes/pipes.module";

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    MaterialComponentsModule,
    PipesModule
  ],
  exports: [
    MaterialComponentsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    PipesModule
  ]
})
export class SharedModule { }
