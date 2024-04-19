import { Component, Input } from '@angular/core';
import { DropdownMenuUserComponent } from '../dropdown-menu-user/dropdown-menu-user.component';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [DropdownMenuUserComponent],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  @Input({required:true}) title!:String
}
