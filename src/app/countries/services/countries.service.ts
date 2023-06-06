import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { ICacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiURL : string = 'https://restcountries.com/v3.1';
    public cacheStore : ICacheStore = {
        byCapital : { term : '', countries : [] },
        byCountries : { term : '', countries : [] },
        byRegion : { countries : [] },
    }
    constructor(private http: HttpClient) {
        this.loadFromLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem("countryCache", JSON.stringify(this.cacheStore));
    }
    private loadFromLocalStorage() {
        if(!localStorage.getItem("countryCache")) return;
        this.cacheStore = JSON.parse(localStorage.getItem("countryCache")!);
    }

    private getCountriesRequest(url : string) : Observable<Country[]> {
        return this.http.get<Country[]>(url)
        .pipe(
            catchError(() => of([])),
        );
    }

    searchCountryByAlphaCode (code : string): Observable<Country | null> {
        return this.http.get<Country[]>(`${this.apiURL}/alpha/${code}`)
        .pipe(
            map(countries => {
                return countries.length > 0 ? countries[0] : null
            }),
            catchError(() => of(null))
        );
    }
    searchByCapital (term : string): Observable<Country[]> {
        return this.getCountriesRequest(`${this.apiURL}/capital/${term}`)
        .pipe(
            tap((countries) => {
                this.cacheStore.byCapital = {
                    term,
                    countries
                }
            }),
            tap(() => this.saveToLocalStorage())
        )
    }

    searchByCountry ( term: string): Observable<Country[]> {
        return this.getCountriesRequest(`${this.apiURL}/name/${term}`)
        .pipe(
            tap((countries) => {
                this.cacheStore.byCountries = {
                    term,
                    countries
                }
            }),
            tap(() => this.saveToLocalStorage())
        )
    }
    
    searchByRegion ( region: Region): Observable<Country[]> {
        return this.getCountriesRequest(`${this.apiURL}/region/${region}`)
        .pipe(
            tap((countries) => {
                this.cacheStore.byRegion = {
                    countries,
                    region
                }
            }),
            tap(() => this.saveToLocalStorage())
        )
    }
    
}