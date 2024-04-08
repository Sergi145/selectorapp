import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../services/country.service";
import {Region, SmallCountry} from "../../interfaces/country.interface";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrl: './selector-pages.component.css'
})
export class SelectorPagesComponent implements OnInit{
    constructor(private fb:FormBuilder, private countriesService:CountryService) {}

    ngOnInit():void {
      this.onRegionChanged();
    }

  public  countriesByRegion: SmallCountry[]=[];

    public myForm:FormGroup = this.fb.group({
      region: ['',Validators.required],
      country: ['',Validators.required],
      borders: ['',Validators.required],

    })

    get regions():Region[] {
      return this.countriesService.regions;
    }

    onRegionChanged():void {
      this.myForm.get('region')!.valueChanges
        .pipe(
          tap(()=> this.myForm.get('country')!.setValue('')),
          switchMap(region => this.countriesService.getCountriesByRegion(region))
        )
        .subscribe (countries => {
          this.countriesByRegion = countries;
        }
      )
    }
}
