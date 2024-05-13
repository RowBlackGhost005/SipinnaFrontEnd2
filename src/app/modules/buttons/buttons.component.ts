import { Component, ViewChild,Output,EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [ModalComponent,CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  //Comunicacion por medio de un EventEmitter para los botones de agregar, editar o eliminar
  @Output() agregar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();
  @Output() eliminar = new EventEmitter<void>();

//Es para si deseas mostrar o no el boton de eliminar, debido a que en ciertas paginas, no debe
//estar disponible la opcion de eliminar.
  @Input() mostrarEliminar: boolean = true; 

  
}
