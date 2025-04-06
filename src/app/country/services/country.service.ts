import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mapper/country.mapper';


const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

private http = inject(HttpClient);



searchByCapital(query: string): Observable<Country[]> {

  query = query.toLowerCase();

  return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
  .pipe(
    map((respCountries) => CountryMapper.mapRestCountriesToCountries(respCountries)),
    delay(1500),
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

  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map((respCountries) => CountryMapper.mapRestCountriesToCountries(respCountries)),
    delay(1500),
    catchError((error) => {
      console.error('Error en la búsqueda por país:', error);

      return throwError(() =>
        new Error(`Error en la búsqueda por país con la consulta: ${query}!!!`)

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
