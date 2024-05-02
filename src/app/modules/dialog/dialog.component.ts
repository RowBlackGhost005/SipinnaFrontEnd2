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
  @Output() close = new EventEmitter<void>();  
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }
}
