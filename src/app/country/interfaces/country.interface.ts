export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  area: number;

}

// export interface Country {
//   cca2: string;
//   flag: string;
//   flagSvg: string;
//   name: {
//     common: string;
//     official: string;
//   };
//   capital: string[];
//   population: number;
//   region: string;
//   subregion: string;
//   languages: { [key: string]: string };
//   currencies: {
//     [key: string]: {
//       name: string;
//       symbol: string;
//     }
//   };
//   borders: string[];
//   area: number;
//   maps: {
//     googleMaps: string;
//     openStreetMaps: string;
//   };
//   timezones: string[];
// }
