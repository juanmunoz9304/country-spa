import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public countries : Country[] = [];

  constructor (private countryService : CountriesService) {}

  searchByRegion (region: string) : void {
    this.countryService.searchByRegion(region).subscribe(countries => {
      this.countries = countries;
    });
  }
}
