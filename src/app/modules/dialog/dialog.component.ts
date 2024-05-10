import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() mensajeDialog: string = '';
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();  // Emite el evento cuando se cierra
  
  /**
   * Esta función muestra el cuadro diálogo
   */
  openModal() {
    this.showModal = true;
  }

  /**
   * Esta función cierra el cuadro diálogo
   */
  closeModal() {
    this.showModal = false;
    this.close.emit();
  }
}
