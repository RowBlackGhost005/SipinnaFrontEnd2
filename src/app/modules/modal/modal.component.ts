import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DominioService } from '../../services/dominio.service';
import { IDominio } from '../../models/dominio.model';
import { EnlaceService } from '../../services/enlace.service';
import { IEnlace } from '../../models/enlace.model';
import { NoticiaService } from '../../services/noticia.service';
import { HttpClient } from '@angular/common/http';
import { INoticia } from '../../models/noticia.model';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() nuevoGuardado:EventEmitter<void>=new EventEmitter<void>();
  @ViewChild('modal') modal?: ElementRef;
  title: string = '';
  lblNombre: string = '';
  placeholderNombre: string = '';
  lblUrl: string = '';
  placeholderUrl: string = '';
  isDomainNameRequired: boolean = true;
  name: string = '';
  url: string = '';
  showUrlInput: boolean = false;
  lblImagen: string = ''
  showImagenInput = false;
  accionBtnGuardar: string = '';


  openModal(title: string, lblNombre: string, placeholderNombre: string,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblImagen: string, showImagenInput: boolean, accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
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


  //Funcion para guardar Noticia, el archivo de la imagen
  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  //Funcion para el boton de guardar, recibe parametros para saber que accion ejecutar
  ejecutarAccion(nombre: string, urlEnlace: string) {
    if (this.accionBtnGuardar === 'dominio') {
      this.guardarDominio(nombre);
    } else if (this.accionBtnGuardar === 'enlace') {
      this.guardarEnlace(nombre, urlEnlace);
    } else if (this.accionBtnGuardar === 'noticia') {
      this.guardarEnlace(nombre, urlEnlace);
    }
  }


  //Constructor de las Interfaces
  constructor(private dominioService: DominioService,
    private enlaceService: EnlaceService,
    private noticiaService: NoticiaService,
    private http: HttpClient) { }

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

  //GUARDAR ENLACE (Falta actualizar la tabla despues de guardar)

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

  // //GUARDAR NOTICIA (Falta actualizar la tabla despues de guardar)
  // guardarNoticia(tituloNoticia: string, urlNoticia: string) {
  //  //Comprobar si se selecciono una imagen
  //  if(this.selectedFile){
  //   const formData=new FormData();
  //   formData.append('file',this.selectedFile);

  //   this.http.post<any>()
  //  }
  // }

}

