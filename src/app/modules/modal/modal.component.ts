import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DominioService } from '../../services/dominio.service';
import { IDominio } from '../../models/dominio.model';
import { EnlaceService } from '../../services/enlace.service';
import { IEnlace } from '../../models/enlace.model';
import { NoticiaService } from '../../services/noticia.service';
import { INoticia } from '../../models/noticia.model';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() nuevoGuardado:EventEmitter<void>=new EventEmitter<void>();
  @ViewChild('modal') modal?: ElementRef;
  title: string = '';
  lblNombre: string = '';
  placeholderNombre: string = '';
  activo: boolean = true;
  showSwitchInput:boolean=true;
  lblUrl: string = '';
  placeholderUrl: string = '';
  isDomainNameRequired: boolean = true;
  name: string = '';
  url: string = '';
  showUrlInput: boolean = false;
  lblImagen: string = ''
  showImagenInput = false;
  accionBtnGuardar: string = '';

  openModal(title: string, lblNombre: string, placeholderNombre: string,showSwitchInput:boolean,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblImagen: string, showImagenInput: boolean, accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
    this.showSwitchInput=showSwitchInput;
    this.lblUrl = lblUrl;
    this.placeholderUrl = placeholderUrl;
    this.showUrlInput = showUrlInput;
    this.lblImagen = lblImagen;
    this.showImagenInput = showImagenInput;
    this.accionBtnGuardar = accion;
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }

  imageUrl: string = '';
  selectedFileName: string = '';
  onFileSelected(event: any):void{
    const file: File = event.target.files[0];
  if (file) {
    // Verificar si el tipo de archivo es una imagen
  if (file.type.match(/^image\/.*/) != null) {
      this.selectedFileName = file.name; 
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
         this.imageUrl = e.target.result;
         console.log("nombre de la imagen:", this.imageUrl);
      };
    } else {
      console.log('Error: El archivo seleccionado no es una imagen.');
    }
  }
  }

  //Funcion para el boton de guardar, recibe parametros para saber que accion ejecutar
  ejecutarAccion(nombre: string, url: string,imagen:string) {
    if (this.accionBtnGuardar === 'dominio') {
      this.guardarDominio(nombre);
    } else if (this.accionBtnGuardar === 'enlace') {
      this.guardarEnlace(nombre, url);
    } else if (this.accionBtnGuardar === 'noticia') {
      this.guardarNoticia(nombre,url,imagen);
    }
  }


  //Constructor de las Interfaces
  constructor(private dominioService: DominioService,
    private enlaceService: EnlaceService,
    private noticiaService:NoticiaService){}



  //GUARDAR DOMINIO
  guardarDominio(nombreDominio: string) {
    const nuevoDominio: IDominio = {
      nombre: nombreDominio
    };

    this.dominioService.postDominio(nuevoDominio).subscribe(
      response => {
        console.log('Dominio guardado correctamente: ', response);
        this.nuevoGuardado.emit();
      },
      error => {
        console.error('error al guardar el dominio: ', error);
      }
    );

    this.closeModal()
  }

  //GUARDAR ENLACE 

  guardarEnlace(tituloEnlace: string, urlEnlace: string) {
    const nuevoEnlace: IEnlace = {
      titulo: tituloEnlace,
      enlace: urlEnlace
    };

    this.enlaceService.postEnlace(nuevoEnlace).subscribe(
      response => {
        console.log('Enlace guardado correctamente: ', response);
        this.nuevoGuardado.emit();
      },
      error => {
        console.error('error al guardar el Enlace: ', error);
      }
    );

    this.closeModal()
  }


  //GUARDAR NOTICIA
  guardarNoticia(  titulo: string, enlace: string,imagen: string ) {
    const nuevaNoticia: INoticia = {
      titulo: titulo,
      imagen: imagen,
      enlace: enlace
    };

    this.noticiaService.postNoticia(nuevaNoticia).subscribe(
      response => {
        console.log('Noticia guardada correctamente: ', response);
        this.nuevoGuardado.emit();
      },
      error => {
        console.error('error al guardar la noticia: ', error);
      }
    );

    this.closeModal()
  }


}

