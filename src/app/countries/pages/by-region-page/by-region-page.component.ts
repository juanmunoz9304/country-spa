import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Observable } from 'rxjs';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  public countries : Country[] = [];
  public isLoading : boolean = false;

  public regions : Region[] = ['Africa', 'Asia','Americas', 'Europe','Oceania'];
  public selectedRegion? : Region;

  constructor (private countryService : CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;

  }

  searchByRegion (region: Region) : void {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countryService.searchByRegion(region).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
