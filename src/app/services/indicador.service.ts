import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IIndicador } from '../models/indicador.model';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {
  private _http = inject(HttpClient);
  private urlBase: string = 'https://localhost:7247/api/indicador';
  
  public getIndicadores(): Observable<IIndicador[]>{
    return this._http.get<IIndicador[]>(this.urlBase);
  }

  public getIndicador(id: number): Observable<IIndicador>{
    return this._http.get<IIndicador>(`${this.urlBase}/${id}`);
  }

  public postIndicador(indicador: FormData): Observable<any>{
    return this._http.post<any>(`${this.urlBase}`, indicador);
  }

  public putIndicador(id: number, indicador: FormData): Observable<any>{
    return this._http.put<any>(`${this.urlBase}/${id}`, indicador);
  }

  public deleteIndicador(id: number): Observable<IIndicador>{
    return this._http.delete<IIndicador>(`${this.urlBase}/${id}`);
  }
}
