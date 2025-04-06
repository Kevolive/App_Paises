import { Component, computed, input } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  standalone: true,
})
export class CountryInformationComponent {
  country = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear();
  })


}
