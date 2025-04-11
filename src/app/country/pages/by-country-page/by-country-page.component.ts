import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import {  of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);
  query = signal('');

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of ([]);
      this.router.navigate(['country/by-country'], {
        queryParams: { query: request.query }
      })
      return   this.countryService.searchByCountry(request.query)
}

    });

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({ request }) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   },
  // });
}

