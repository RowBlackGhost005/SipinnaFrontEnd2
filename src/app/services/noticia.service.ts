import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INoticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private _http = inject(HttpClient);
  private urlBase: string = 'https://localhost:7247/api/noticias';
  
 
  private noticiaSeleccionadaSource = new BehaviorSubject<INoticia | null>(null);
  noticiaSeleccionada$: Observable<INoticia | null> = this.noticiaSeleccionadaSource.asObservable();

  constructor() { }

  actualizarNoticiaSeleccionada(noticia: INoticia| null): void {
    this.noticiaSeleccionadaSource.next(noticia);
  }

  setNoticiaSeleccionada(noticia: INoticia | null) {
    this.noticiaSeleccionadaSource.next(noticia);
  }

  public getNoticias(): Observable<INoticia[]>{
    return this._http.get<INoticia[]>(this.urlBase);
  }

  public getNoticia(id: number): Observable<INoticia>{
    return this._http.get<INoticia>(`${this.urlBase}/${id}`);
  }

  public postNoticia(noticia: INoticia): Observable<INoticia>{
    return this._http.post<INoticia>(`${this.urlBase}`, noticia);
  }

  public putNoticia(noticia: INoticia): Observable<INoticia>{
    return this._http.put<INoticia>(this.urlBase,noticia );
  }

  public deleteNoticia(id: number): Observable<INoticia>{
    return this._http.delete<INoticia>(`${this.urlBase}?id=${id}`);
  }
}
