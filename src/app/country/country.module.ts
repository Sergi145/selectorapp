import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountryRoutingModule} from "./country-routing.module";
import { SelectorPagesComponent } from './pages/selector-pages/selector-pages.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SelectorPagesComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }
