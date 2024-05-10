import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  //El nombre que tendrá el boton
  @Input({required:true}) nombre!:String;
  //La página a la que se va a cambiar
  @Input({required:true}) ruta!:String;
  //El número de la opción que va a emitir el sidebar.component
  @Input({required:true}) opcion!:number;
  //El ícono que va a tener el botón
  @Input({required:true}) nombreSpan!:String;
  
}
