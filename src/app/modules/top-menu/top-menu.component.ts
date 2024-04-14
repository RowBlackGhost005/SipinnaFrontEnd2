import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  @Input({required:true}) title!:String
}
