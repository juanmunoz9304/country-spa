import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, count, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiURL : string = 'https://restcountries.com/v3.1';
    constructor(private http: HttpClient) { }

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
        return this.http.get<Country[]>(`${this.apiURL}/capital/${term}`)
        .pipe(
            catchError(() => of([]))
        );
    }

    searchByCountry ( term: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.apiURL}/name/${term}`)
        .pipe(
            catchError(() => of([]))
        );
    }
    
    searchByRegion ( region: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.apiURL}/region/${region}`)
        .pipe(
            catchError(() => of([]))
        );
    }
    
}