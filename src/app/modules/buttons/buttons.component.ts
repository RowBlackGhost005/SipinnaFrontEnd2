import { Component, ViewChild,Output,EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  @Output() agregar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();
  @Output() eliminar = new EventEmitter<void>();
}
