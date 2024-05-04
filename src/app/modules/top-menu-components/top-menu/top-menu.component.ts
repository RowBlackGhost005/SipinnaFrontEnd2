import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild, signal } from '@angular/core';
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
  @Input({required:true}) alphanumericOnly!:boolean;
  @ViewChild('topmenu') topmenu!: ElementRef<HTMLDivElement>;
  @ViewChild('searchbar') searchbar!: ElementRef<HTMLDivElement>;


  // @HostListener('window:resize')
  // onWindowResize(){
  //  this.updateDropdown();
  // }


  // updateDropdown(){
  //   const width = window.innerWidth
    
  //   if(width<421){
  //       if (this.searchbar===undefined) {
  //       this.topmenu.nativeElement.style.flexDirection = 'row-reverse';
  //       }
  //   } else{
  //     this.topmenu.nativeElement.style.flexDirection = 'row';
  //   }
  // }

}
