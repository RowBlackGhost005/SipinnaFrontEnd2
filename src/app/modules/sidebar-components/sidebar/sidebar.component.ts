import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarItemComponent,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() optionSelected = new EventEmitter();

  /**
   * Emite un evento en el que manda un número que hace referencia al botón del
   * sidebar que fue pulsado con el fin de cambiar a la página que fue seleccionada
   * 
   * inicio:1 dominio:2 indicadores:3 noticias:4 enlaces:5 usuarios:6 
   * 
   * @param event El número que hace referencia al botón pulsado
   */
  optionHandler(event:number){
    this.optionSelected.emit(event);
  }

}
