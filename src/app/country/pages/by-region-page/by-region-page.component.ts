import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { NgFor } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctica: 'Antarctica'

  };

  return validRegions[queryParam.toLowerCase()] ?? 'Americas';

}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, NgFor],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

regions : Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctica'];
countries: Country[] = [];

countryService = inject(CountryService)
activatedRoute = inject(ActivatedRoute);
router = inject(Router)

queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

countryResource = rxResource({
  request: () => ({ region: this.selectedRegion() }),
  loader: ({ request }) => {
    if (!request.region) return of ([]);
    this.router.navigate(['country/by-region'], {
      queryParams: { region: request.region }
    })

    return   this.countryService.searchByRegion(request.region)
}

  })

// selectRegion(region: string) {
//   this.selectedRegion.set(region as Region);

// }

}
