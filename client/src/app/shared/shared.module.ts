import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponentsModule} from "./material-components/material-components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedComponentsModule} from "./components/shared-components.module";
import {SharedPipesModule} from "./pipes/shared-pipes.module";
import {SharedDirectivesModule} from "./directives/shared-directives.module";

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    MaterialComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ],
  exports: [
    MaterialComponentsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule
  ]
})
export class SharedModule { }
