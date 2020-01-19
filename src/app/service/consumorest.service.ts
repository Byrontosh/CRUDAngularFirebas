import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConsumorestService {

  constructor(private http: HttpClient) { }

  getCategoriasRest(){
    return this.http.get('http://localhost:3000/api/categoria');
  }
}
