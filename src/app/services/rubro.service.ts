import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRubro } from '../models/rubro.model';

@Injectable({
  providedIn: 'root'
})
export class RubroService {
  private _http = inject(HttpClient);
  private urlBase: string = 'https://localhost:7247/api/rubro';

  private rubroSeleccionadoSource = new BehaviorSubject<IRubro | null>(null);
  rubroSeleccionado$: Observable<IRubro | null> = this.rubroSeleccionadoSource.asObservable();

  constructor() { }

  actualizarRubroSeleccionado(rubro: IRubro| null): void {
    this.rubroSeleccionadoSource.next(rubro);
  }

  setRubroSeleccionado(rubro: IRubro | null) {
    this.rubroSeleccionadoSource.next(rubro);
  }
  
  public getRubros(): Observable<IRubro[]>{
    return this._http.get<IRubro[]>(this.urlBase);
  }

  public getRubro(id: number): Observable<IRubro>{
    return this._http.get<IRubro>(`${this.urlBase}/${id}`);
  }

  public postRubro(rubro: IRubro): Observable<IRubro>{
    return this._http.post<IRubro>(`${this.urlBase}`, rubro);
  }

  public putRubro(id: number, formData: FormData): Observable<IRubro>{
    return this._http.put<IRubro>(`${this.urlBase}/${id}`, formData);
  }

  public deleteRubro(id: number): Observable<IRubro>{
    return this._http.delete<IRubro>(`${this.urlBase}/${id}`);
  }

  public getRubrosDeIndicador(id: number): Observable<IRubro[]>{
    return this._http.get<IRubro[]>(`${this.urlBase}/rubroIndicador/${id}`);
  }

  public postRubroIndicador(formData: FormData): Observable<IRubro>{
    return this._http.post<IRubro>(`${this.urlBase}/rubroIndicador`, formData);
  }

  public getRubroDescarga(id: number): Observable<Blob> {
    return this._http.get(`${this.urlBase}/descargas/?id=${id}`, {
        responseType: 'blob'
    });
  }
}
