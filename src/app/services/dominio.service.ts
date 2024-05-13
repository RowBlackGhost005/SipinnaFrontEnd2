import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDominio } from '../models/dominio.model';

@Injectable({
  providedIn: 'root'
})
export class DominioService {
  private _http = inject(HttpClient);
  private urlBase: string = 'https://localhost:7247/api/dominio';

  private dominioSeleccionadoSource = new BehaviorSubject<IDominio | null>(null);
  dominioSeleccionado$: Observable<IDominio | null> = this.dominioSeleccionadoSource.asObservable();

  constructor() { }

  actualizarDominioSeleccionado(dominio: IDominio | null): void {
    this.dominioSeleccionadoSource.next(dominio);
  }

  setDominioSeleccionado(dominio: IDominio | null) {
    this.dominioSeleccionadoSource.next(dominio);
  }
  
  public getDominios(): Observable<IDominio[]>{
    return this._http.get<IDominio[]>(this.urlBase);
  }

  public getDominio(id: number): Observable<IDominio>{
    return this._http.get<IDominio>(`${this.urlBase}/${id}`);
  }

  public postDominio(dominio: IDominio): Observable<IDominio>{
    return this._http.post<IDominio>(`${this.urlBase}`, dominio);
  }

  public putDominio(id: number, dominio: IDominio): Observable<IDominio>{
    return this._http.put<IDominio>(`${this.urlBase}/${id}`, dominio);
  }

  public deleteDominio(id: number): Observable<IDominio>{
    return this._http.delete<IDominio>(`${this.urlBase}/${id}`);
  }
}
