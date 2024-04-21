import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  /**
   * Con esta variable se hara la escucha entre el componente del buscador con el componente de tabla
   */
  results = signal("")


  private eventSubject = new Subject<any>();
  eventObservable$ = this.eventSubject.asObservable();

  constructor() { }

  //hacer el de cambiar pagina

  changeResults(results:string){
    this.results.set(results); 
  }

  emitEvent(event:any): void{
    this.eventSubject.next(event);
  }
}
