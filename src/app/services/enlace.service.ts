import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEnlace } from '../models/enlace.model';

@Injectable({
  providedIn: 'root'
})
export class EnlaceService {
  private _http = inject(HttpClient);
  private urlBase: string = 'https://localhost:7247/api/enlaces';
  
  public getEnlaces(): Observable<IEnlace[]>{
    return this._http.get<IEnlace[]>(this.urlBase);
  }

  public getEnlace(id: number): Observable<IEnlace>{
    return this._http.get<IEnlace>(`${this.urlBase}/${id}`);
  }

  public postEnlace(enlace: IEnlace): Observable<IEnlace>{
    return this._http.post<IEnlace>(`${this.urlBase}`, enlace);
  }

  public putEnlace(id: number, enlace: IEnlace): Observable<IEnlace>{
    return this._http.put<IEnlace>(`${this.urlBase}/${id}`, enlace);
  }

  public deleteEnlace(id: number): Observable<IEnlace>{
    return this._http.delete<IEnlace>(`${this.urlBase}/${id}`);
  }
}
