import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';


const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

private http = inject(HttpClient);
private queryCacheByCapital = new Map<string, Country[]>();
private queryCacheByCountry = new Map<string, Country[]>();
private queryCacheByRegion = new Map<string, Country[]>();
// private queryCacheByCountry = new Map<string, Country[]>();
// constructor() { }



searchByCapital(query: string): Observable<Country[]> {
  query = query.toLowerCase();

if (this.queryCacheByCapital.has(query)) {
  return of(this.queryCacheByCapital.get(query) ?? []);

}
console.log(`Llegando al servidor para mostrar informaión de ${query}`);

  return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
  .pipe(
    map((respCountries) => CountryMapper.mapRestCountriesToCountries(respCountries)),
    tap((countries) => this.queryCacheByCapital.set(query, countries)),

    catchError((error) => {
      console.error('Error en la búsqueda por capital:', error);

      return throwError(() =>
        new Error(`Error en la búsqueda por capital con la consulta: ${query}!!!`)

      );
    })
  )
}

searchByCountry(query: string): Observable<Country[]> {
   const url = `${API_URL}/name/${query}`;
  query = query.toLowerCase();

  if (this.queryCacheByCountry.has(query)) {
    return of(this.queryCacheByCountry.get(query) ?? []);

  }
  console.log(`Llegando al servidor para mostrar informaión de ${query}`);


  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map((respCountries) => CountryMapper.mapRestCountriesToCountries(respCountries)),
    tap((countries) => this.queryCacheByCountry.set(query, countries)),
    delay(1500),
    catchError((error) => {
      console.error('Error en la búsqueda por país:', error);

      return throwError(() =>
        new Error(`Error en la búsqueda por país con la consulta: ${query}!!!`)

      );
    })
  )


}
searchByRegion(region: string): Observable<Country[]> {
   const url = `${API_URL}/region/${region}`;
   region = region.toLowerCase();

  if (this.queryCacheByCountry.has(region)) {
    return of(this.queryCacheByCountry.get(region) ?? []);

  }
  console.log(`Llegando al servidor para mostrar informaión de ${region}`);


  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map((respCountries) => CountryMapper.mapRestCountriesToCountries(respCountries)),
    tap((countries) => this.queryCacheByRegion.set(region, countries)),
     catchError((error) => {
      console.error('Error en la búsqueda por región:', error);

      return throwError(() =>
        new Error(`Error en la búsqueda por país con la consulta: ${region}!!!`)

      );
    })
  )


}
searchCountryByAlphaCpde(code: string) {
   const url = `${API_URL}/alpha/${code}`;

   return this.http.get<RESTCountry[]>(url)
  .pipe(
    map((respCountries) => CountryMapper.mapRestCountriesToCountries(respCountries)),
    map(countries => countries.at(0)),
    catchError((error) => {
      console.error('Error en la búsqueda por país:', error);

      return throwError(() =>
        new Error(`Error en la búsqueda por país con ese codigo: ${code}!!!`)

      );
    })
  )


}

}
