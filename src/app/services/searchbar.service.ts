import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  /**
   * Con esta variable se hara la escucha entre el componente del buscador con el componente de tabla
   */
  page = signal("")
  show = signal(true)

  constructor() { }

  changePage(page:string){
    this.page.set(page); 
  }
}
