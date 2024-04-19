import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuarios } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _http = inject(HttpClient);
  private urlBase: string = 'https://localhost:7247/api/usuarios';
  
  public getUsuarios(): Observable<IUsuarios[]>{
    return this._http.get<IUsuarios[]>(this.urlBase);
  }

  public getUsuario(id: number): Observable<IUsuarios>{
    return this._http.get<IUsuarios>(`${this.urlBase}/${id}`);
  }

  public postUsuario(usuario: IUsuarios): Observable<IUsuarios>{
    return this._http.post<IUsuarios>(`${this.urlBase}`, usuario);
  }

  public putUsuario(id: number, usuario: IUsuarios): Observable<IUsuarios>{
    return this._http.put<IUsuarios>(`${this.urlBase}/${id}`, usuario);
  }

  public deleteUsuario(id: number): Observable<IUsuarios>{
    return this._http.delete<IUsuarios>(`${this.urlBase}/${id}`);
  }
}
