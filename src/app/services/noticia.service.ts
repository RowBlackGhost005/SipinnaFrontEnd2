import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { INoticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private _http = inject(HttpClient);
  private urlBase: string = 'https://localhost:7247/api/noticias';
  
  public getNoticias(): Observable<INoticia[]>{
    return this._http.get<INoticia[]>(this.urlBase);
  }

  public getNoticia(id: number): Observable<INoticia>{
    return this._http.get<INoticia>(`${this.urlBase}/${id}`);
  }

  public postNoticia(noticia: INoticia): Observable<INoticia>{
    return this._http.post<INoticia>(`${this.urlBase}`, noticia);
  }

  public putNoticia(id: number, noticia: INoticia): Observable<INoticia>{
    return this._http.put<INoticia>(`${this.urlBase}/${id}`, noticia);
  }

  public deleteNoticia(id: number): Observable<INoticia>{
    return this._http.delete<INoticia>(`${this.urlBase}/${id}`);
  }
}
