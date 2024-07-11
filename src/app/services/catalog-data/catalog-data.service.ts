import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { IData } from '../../components/catalog/catalog.component';

@Injectable({
  providedIn: 'root'
})
export class CatalogDataService {
  
  constructor(
    private _http: HttpClient
  ) { }

  getData(page?:number): any  {
   let url = page ? `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=2&order=RATING&type=ALL&ratingFrom=0&ratingTo=20&yearFrom=1000&yearTo=3000&page=${page}`
    : 'https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=2&order=RATING&type=ALL&ratingFrom=0&ratingTo=20&yearFrom=1000&yearTo=3000&page=3' 

        return  this._http.get( url, { 
          headers: {
          'X-API-KEY': 'c89649cd-02db-4807-8d1d-e73e038b5973',
          'Content-Type': 'application/json',
          } 
      });
  };
  
  getById(id:number){
    let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`
    return  this._http.get( url, { 
      headers: {
      'X-API-KEY': 'c89649cd-02db-4807-8d1d-e73e038b5973',
      'Content-Type': 'application/json',
      } 
    });
  }
}
