import { Component, Input, signal } from '@angular/core';
import { DropdownMenuUserComponent } from '../dropdown-menu-user/dropdown-menu-user.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [DropdownMenuUserComponent,SearchbarComponent, CommonModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  @Input({required:true}) title!:String
  @Input({required:true}) needSearchbar!:boolean
}
