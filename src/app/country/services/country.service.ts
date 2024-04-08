import {Injectable} from '@angular/core';
import {Country, Region, SmallCountry} from "../interfaces/country.interface";
import {Observable, of,pipe,tap,map} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class CountryService {

  private baseUrl:string = 'https://restcountries.com/v3.1';

  constructor(private http:HttpClient) {}

  private _regions:Region[] =[Region.Europe,Region.Americas,Region.Africa,Region.Oceania,Region.Asia];

  get regions():Region[]{
    return [...this._regions]
  }

  getCountriesByRegion (region:Region):Observable<any[]> {
    if (!region) return of([]);

    const url:string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.map(country => ({
          name: country.name.common,
          cca3: country.ccn3,
          borders: country.borders ?? []
        }))),
      )
  }
}
