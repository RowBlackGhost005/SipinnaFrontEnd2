import { Component, ElementRef, NgModule, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// @ts-ignore
const $:any=window['$']
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
@ViewChild('modal') modal?: ElementRef;
title:string='';
label:string='';
placeholder:string='';

openModal(title:string,label:string,placeholder:string){
  this.title=title;
  this.label=label;
  this.placeholder=placeholder;

  $(this.modal?.nativeElement).modal('show');

}

closeModal(){
  $(this.modal?.nativeElement).modal('hide');
}

isDomainNameRequired: boolean = true; 
isSubmitted: boolean = false; 
domainName: string = '';

submitForm() {
  this.isSubmitted = true; 
  if (this.domainName) {
    console.log('Domain Name:', this.domainName);
  }
}
}
