import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { NgFor } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, NgFor],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

regions : Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctica'];
countries: Country[] = [];

countryService = inject(CountryService)



selectedRegion = signal<Region | null>(null);

countryResource = rxResource({
  request: () => ({ region: this.selectedRegion() }),
  loader: ({ request }) => {
    if (!request.region) return of ([]);

    return   this.countryService.searchByRegion(request.region)
}

  })

// selectRegion(region: string) {
//   this.selectedRegion.set(region as Region);

// }

}
