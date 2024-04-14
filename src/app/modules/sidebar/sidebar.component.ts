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


  optionHandler(event:number){
    this.optionSelected.emit(event);
  }

}
