import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-user',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './dropdown-menu-user.component.html',
  styleUrl: './dropdown-menu-user.component.scss'
})
export class DropdownMenuUserComponent {

}
