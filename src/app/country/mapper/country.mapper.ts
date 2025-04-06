import { Country } from "../interfaces/country.interface";
import { RESTCountry, Currencies } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {

    return {
      capital: restCountry.capital.join(", "),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa']?.common || restCountry.name.common,
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
      area: restCountry.area,



    };
  }

  static mapRestCountriesToCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map((restCountry) => this.mapRestCountryToCountry(restCountry));
  }
}
