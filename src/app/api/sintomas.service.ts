import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})

export class SintomasService {

  public url: string;

  constructor(public http: HttpClient) { 
    this.url = global.url+ "sintomas/"
  }
  
  register(Symptoms): Observable<any> {
    const params = [
      Symptoms.dificultad_respiratoria, 
      Symptoms.fiebre,
      Symptoms.tos,
      Symptoms.dolor_cuerpo,
      Symptoms.mucosidad,
      Symptoms.estornudos,
      Symptoms.garganta
    ];
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url+JSON.stringify(params));
  } 

}
