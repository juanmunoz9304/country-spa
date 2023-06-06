import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface ICacheStore {
    byCapital : ITermCountries;
    byCountries : ITermCountries;
    byRegion : IRegionCountries;
}

export interface ITermCountries {
    term : string;
    countries : Country[];
}

export interface IRegionCountries extends Omit<ITermCountries, "term">  {
    region? : Region;
}