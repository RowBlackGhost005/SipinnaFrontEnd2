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
lblNombre:string='';
placeholderNombre:string='';
lblUrl:string='';
placeholderUrl:string='';
isDomainNameRequired: boolean = true; 
domainName: string = '';
showUrlInput: boolean = false;
lblImagen:string=''
showImagenInput=false;


openModal(title:string,lblNombre:string,placeholderNombre:string,
  lblUrl:string,placeholderUrl:string,showUrlInput:boolean,
lblImagen:string,showImagenInput:boolean){
  this.title=title;
  this.lblNombre=lblNombre;
  this.placeholderNombre=placeholderNombre;
  this.lblUrl=lblUrl;
  this.placeholderUrl=placeholderUrl;
  this.showUrlInput = showUrlInput;
  this.lblImagen=lblImagen;
  this.showImagenInput=showImagenInput

  $(this.modal?.nativeElement).modal('show');

}

closeModal(){
  $(this.modal?.nativeElement).modal('hide');
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  //realizar acciones como cargar la imagen al servidor o mostrarla en la interfaz de usuario
}


}
