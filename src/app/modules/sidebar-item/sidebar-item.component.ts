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
  @Input({required:true}) nombre!:String;
  @Input({required:true}) ruta!:String;
  @Input({required:true}) opcion!:number;
  @Input({required:true}) nombreSpan!:String;
  
}
