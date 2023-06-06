import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries : Country[] = [];
  public isLoading : boolean = false;
  public initialVal : string = '';

  constructor (private countriesService : CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialVal = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital (val : string): void {
    this.isLoading = true;
    this.countriesService.searchByCapital(val).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    })    
  }
}
