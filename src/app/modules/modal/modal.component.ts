import { Component, ElementRef, NgModule, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
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
import { RubroService } from '../../services/rubro.service';
import { IRubro } from '../../models/rubro.model';
import { ActivatedRoute } from '@angular/router';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  @Output() nuevoGuardado: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('modal') modal?: ElementRef;
  @ViewChild('validar') inputElementRef!: ElementRef<HTMLInputElement>;
  private _route = inject(ActivatedRoute);

  dominioSeleccionado: IDominio | null = null;
  enlaceSeleccionado: IEnlace | null = null;
  noticiaSeleccionada: INoticia | null = null;
  rubroSeleccionado: IRubro | null = null;
  private _rubroService = inject(RubroService);

  //Constructor de las Interfaces
  constructor(private dominioService: DominioService,
    private enlaceService: EnlaceService,
    private noticiaService: NoticiaService,
    private rubroService: RubroService) { }

  ngOnInit(): void {
    this.enlaceService.enlaceSeleccionado$.subscribe(enlace => {
      this.enlaceSeleccionado = enlace;
    });
    this.dominioService.dominioSeleccionado$.subscribe(dominio => {
      this.dominioSeleccionado = dominio;
    });
    this.noticiaService.noticiaSeleccionada$.subscribe(noticia => {
      this.noticiaSeleccionada = noticia;
    });
    this.rubroService.rubroSeleccionado$.subscribe(rubro => {
      this.rubroSeleccionado = rubro;
    });
  }


  //Variable para el titulo del modal
  title: string = '';

  //Variables para los datos del input de Nombres
  //
  //lblNombre: Texto que estara en el label
  //placeholderNombre: Mensaje que estara en el input
  //showNameInput: Para si deseas mostrar ese input
  //activo: Switch para activar o desactivar dominio.
  //showSwitchInput: Para si deseas mostrar el switch
  lblNombre: string = '';
  placeholderNombre: string = '';
  showNameInput: boolean = false;
  activo: boolean = true;
  showSwitchInput: boolean = false;

  //Variables para los datos del input de la Url
  //
  //lblUrl: Texto que estara en el label
  //placeholderUrl: Mensaje que estara en el input
  //showUrlInput: Para si deseas mostrar ese input
  lblUrl: string = '';
  placeholderUrl: string = '';
  showUrlInput: boolean = false;

  //Variables para los datos del input del input File
  //
  //lblFile: Texto que estara en el label
  //showFileInput: Para si deseas mostrar ese input
  //advertenciaFormato: Para mostrar en texto, el formato que debe subirse.
  lblFile: string = ''
  showFileInput: boolean = false;
  advertenciaFormato: string = '';


  //Variables para los datos del input Dropdown
  //
  //lblRubro: Texto que estara en el label
  //showDropdownInput: Para si deseas mostrar ese input
  lblRubro: string = '';
  showDropdownInput: boolean = false;

  //Variable para poner el signo de "*" al lado de las label 
  isNameRequired: boolean = true;

  //Parametro que se envia al boton de guardar:
  //Nombre dominio, enlace, noticia.
  name: string = '';
  //Url de enlace o noticia.
  url: string = '';
  // Variable para almacenar la opción seleccionada del dropdown para los rubros.
  selectedOption: string | null = null;
  //Variable para guardar el nombre de la imagen o archivo seleccionado
  imageUrl: string = '';

  //Variable para guardar el file que se selecciona en el input
  selectedFile: File | null = null;


  selectedFileName: string = '';


  //Para manejar la accion que realizara el boton de guardar
  accionBtnGuardar: string = '';

  alphanumericOnly: boolean = false;


  // Esta funcion se utiliza para abrir el modal de dominio, 
  // le das un titulo, 
  // texto del primer label,
  // texto del placeholder del input,
  // y si deseas que se muestre el input,
  // si deseas que se muestre el switch,
  // y la accion que realizara el Modal, al dar click en Guardar
  openModalDominio(title: string,
    lblNombre: string, placeholderNombre: string, showNameInput: boolean,
    showSwitchInput: boolean,
    accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
    this.showNameInput = showNameInput;
    this.showSwitchInput = showSwitchInput;
    this.accionBtnGuardar = accion;
    this.alphanumericOnly = true;

    $(this.modal?.nativeElement).modal('show');



  }


  // Esta funcion es para abrir el modal de noticias,
  // le das un titulo al modal,
  // texto del primer label, texto del primer placeholder del input de texto y si desea mostrarlo,
  // texto del segundo label, texto del segundo placeholder del input de texto y si desea mostrarlo,
  // texto para el input del file, texto para la advertencia de formato y si deseas mostrar el input File
  // accion que realizara el modal al dar en guardar.
  openModalNoticia(title: string,
    lblNombre: string, placeholderNombre: string, showNameInput: boolean,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblFile: string, advertenciaFormato: string, showFileInput: boolean,
    accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
    this.showNameInput = showNameInput;
    this.lblUrl = lblUrl;
    this.placeholderUrl = placeholderUrl;
    this.showUrlInput = showUrlInput;
    this.lblFile = lblFile;
    this.advertenciaFormato = advertenciaFormato;
    this.showFileInput = showFileInput;
    this.alphanumericOnly = false;

    this.accionBtnGuardar = accion;

    $(this.modal?.nativeElement).modal('show');
  }


  // Esta funcion es para abrir el modal de enlaces, 
  // le das un titulo al modal,
  // texto del primer label, texto del primer placeholder del input de texto y si desea mostrarlo,
  // texto del segundo label, texto del segundo placeholder del input de texto y si desea mostrarlo,
  // accion que realizara el modal al dar en guardar.
  openModalEnlace(title: string,
    lblNombre: string, placeholderNombre: string, showNameInput: boolean,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
    this.showNameInput = showNameInput;
    this.lblUrl = lblUrl;
    this.placeholderUrl = placeholderUrl;
    this.showUrlInput = showUrlInput;
    this.accionBtnGuardar = accion;
    this.alphanumericOnly = false;

    $(this.modal?.nativeElement).modal('show');
  }


  // Esta funcion es para abrir el modal de rubro,
  // este solo utiliza el input de tipo File y un Dropdown,
  // le das el titulo del modal,
  // label para el input File, texto para la advertencia de formato y si deseas mostrar el input,
  // label para el input tipo dropdown, y si deseas mostrarlo,
  // accion que realizara al dar click en el boton de guardar.
  openModalRubro(title: string,
    lblFile: string, advertenciaFormato: string, showFileInput: boolean,
    lblRubro: string, showDropdownInput: boolean,
    accion: string) {
    this.title = title;
    this.lblFile = lblFile;
    this.advertenciaFormato = advertenciaFormato;
    this.showFileInput = showFileInput;
    this.lblRubro = lblRubro;
    this.showDropdownInput = showDropdownInput;
    this.accionBtnGuardar = accion;
    this.alphanumericOnly = false;

    $(this.modal?.nativeElement).modal('show');
  }


  //Funcion para cerrar el modal
  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }


  //Valores del dropdown
  //label: Lo que se muestra
  //value:Valor real tipo string
  dropdownOptions = [
    { label: '<1', value: '<1' },
    { label: '1 a 2', value: '1 a 2' },
    { label: '3 a 5', value: '3 a 5' },
    { label: '0 a 11', value: '0 a 11' },
    { label: '0 a 17', value: '0 a 17' },
    { label: '12 a 17', value: '12 a 17' },
    { label: '6 a 11', value: '6 a 11' }
  ];


  // Funcion para manipular la accion de el File que se seleccione en el input de tipo File.
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Verificar si el tipo de archivo es una imagen
      // if (file.type.match(/^image\/.*/) != null) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      // } else {
      //   console.log('Error: El archivo seleccionado no es una imagen.');
      // }
    }
  }

  //Funcion para el boton de guardar, recibe parametros para saber que accion ejecutar
  ejecutarAccion(nombre: string, url: string, imagen: string) {
    if (this.accionBtnGuardar === 'guardarDominio') {
      this.guardarDominio(nombre, this.activo);
    } else if (this.accionBtnGuardar === 'editarDominio') {
      if (this.dominioSeleccionado) {
        this.actualizarDominio(this.dominioSeleccionado.iddominio, nombre, this.activo);
      } else {
        console.error('this.dominioSeleccionado es null.');
      }
    } else if (this.accionBtnGuardar === 'guardarEnlace') {
      this.guardarEnlace(nombre, url);
    } else if (this.accionBtnGuardar === 'editarEnlace') {
      if (this.enlaceSeleccionado) {
        this.actualizarEnlace(this.enlaceSeleccionado.idenlaces, nombre, url);
      } else {
        console.error('this.enlaceSeleccionado es null.');
      }
    } else if (this.accionBtnGuardar === 'guardarNoticia') {
      this.guardarNoticia(nombre, url, imagen);
    } else if (this.accionBtnGuardar === 'editarNoticia') {
      if (this.noticiaSeleccionada) {
        this.actualizarNoticia(this.noticiaSeleccionada.idnoticias, nombre, url, imagen);
      } else {
        console.error('this.enlaceSeleccionado es null.');
      }
    } else if (this.accionBtnGuardar === 'guardarRubro') {
      // Verifica si selectedFile no es null antes de llamar a guardarRubroDeIndicador
      if (this.selectedFile) {
        // Obtiene el id del indicador al que pertenece de la ruta
        const id = this._route.snapshot.params['id'];
        this.guardarRubroDeIndicador(this.selectedFile, id);
      } else {
        console.error('No se ha seleccionado ningún archivo.');
      }
    } else if (this.accionBtnGuardar === 'editarRubro') {
      if (this.rubroSeleccionado && this.selectedFile) {
        const id = this._route.snapshot.params['id'];
        this.actualizarRubro(this.selectedFile, this.rubroSeleccionado.idrubro)
      } else {
        console.error('No se ha seleccionado ningún archivo.');
      }
    }


  }


  //FUNCIONES PARA GUARDAR Y EDITAR DOMINIOS

  //Funcion para guardar un nuevo dominio, recibe el nombre y el estado del dominio.
  guardarDominio(nombreDominio: string, estadoDominio: boolean) {
    const nuevoDominio: IDominio = {
      nombre: nombreDominio,
      estado: estadoDominio,
      iddominio: 0
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

  //Funcion que se llama desde dominiosComponent para abrir el modal y traerse los datos
  editarDominio() {
    // Verifica que haya un enlace seleccionado
    if (this.dominioSeleccionado) {
      // Carga los datos del enlace seleccionado en los campos del formulario
      this.name = this.dominioSeleccionado.nombre;
      this.activo = this.dominioSeleccionado.estado;
      // Abre el modal
      this.openModalDominio('Editar Dominio',
        'Dominio', 'CAPTURE EL NUEVO NOMBRE DEL DOMINIO', true,
        true,
        'editarDominio');
    }
  }

  //Funcion para actualizar el dominio 
  actualizarDominio(id: number, nombre: string, estado: boolean): void {
    const dominioActualizado: IDominio = {
      iddominio: id,
      nombre: nombre,
      estado: estado
    };
    this.dominioService?.putDominio(id, dominioActualizado)?.subscribe(
      response => {
        console.log('Dominio actualizado correctamente:', response);
        this.nuevoGuardado.emit();
        this.closeModal();
      },
      error => {
        console.error('Error al actualizar el dominio:', error);
      }
    );
  }





  //FUNCIONES PARA GUARDAR Y EDITAR ENLACES

  //Funcion para guardar el enlace.
  guardarEnlace(tituloEnlace: string, urlEnlace: string) {
    const enlaceI: IEnlace = {
      titulo: tituloEnlace,
      enlace: urlEnlace,
      idenlaces: 0
    };
    this.enlaceService.postEnlace(enlaceI).subscribe(
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

  //Funcion que se llama desde en enlacesComponent para abrir el modal y traerse los datos
  editarEnlace() {
    // Verifica que haya un enlace seleccionado
    if (this.enlaceSeleccionado) {
      // Carga los datos del enlace seleccionado en los campos del formulario
      this.name = this.enlaceSeleccionado.titulo;
      this.url = this.enlaceSeleccionado.enlace;
      // Abre el modal
      this.openModalEnlace('Editar Enlace',
        'Nuevo Título', 'Ingrese el nuevo título del enlace', true,
        'Nuevo URL', 'Ingrese el nuevo URL del enlace', true,
        'editarEnlace');
    }
  }

  //Funcion para actualizar el Enlace.
  actualizarEnlace(id: number, titulo: string, enlace: string): void {
    const enlaceActualizado: IEnlace = {
      idenlaces: id,
      titulo: titulo,
      enlace: enlace
    };
    this.enlaceService?.putEnlace(enlaceActualizado)?.subscribe(
      response => {
        console.log('Enlace actualizado correctamente:', response);
        this.nuevoGuardado.emit();
        this.closeModal();
      },
      error => {
        console.error('Error al actualizar el enlace:', error);
      }
    );
  }

  //FUNCIONES PARA GUARDAR Y EDITAR NOTICIAS.

  //Funcion para guardar noticias (Funciona pero falta solucionar la imagen)
  guardarNoticia(titulo: string, enlace: string, imagen: string) {
    const nuevaNoticia: INoticia = {
      titulo: titulo,
      imagen: imagen,
      enlace: enlace,
      idnoticias: 0

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

  //Funcion que se llama desde en noticiasComponent para abrir el modal y traerse los datos
  editarNoticia() {
    // Verifica que haya una noticia seleccionado
    if (this.noticiaSeleccionada) {
      // Carga los datos de la noticia seleccionada en los campos del formulario
      this.name = this.noticiaSeleccionada.titulo;
      this.url = this.noticiaSeleccionada.enlace;
      this.imageUrl = this.noticiaSeleccionada.imagen;
      // Abre el modal
      this.openModalNoticia('Editar Noticia',
        'Titulo', 'CAPTURE EL TITULO DE LA NOTICIA', true,
        'Url', 'CAPTURE LA URL DE LA NOTICIA', true,
        'Fotografia de la noticia', 'Solo se permiten archivos de extension .png .jpg .jpeg y maximo de 2mb', true,
        'editarNoticia');
    }
  }

  //Funcion para actualizar la noticia.
  actualizarNoticia(id: number, titulo: string, enlace: string, imagen: string): void {
    const noticiaActualizada: INoticia = {
      idnoticias: id,
      titulo: titulo,
      enlace: enlace,
      imagen: imagen
    };
    this.noticiaService?.putNoticia(noticiaActualizada)?.subscribe(
      response => {
        console.log('Noticia actualizada correctamente:', response);
        this.nuevoGuardado.emit();
        this.closeModal();
      },
      error => {
        console.error('Error al actualizar la noticia:', error);
      }
    );
  }



  //FUNCION PARA GUARDAR Y EDITAR RUBROS

  //Funcion para guardar Rubros
  guardarRubroDeIndicador(datos: File, idIndicador: number) {
    const rubro = this.obtenerOpcionSeleccionada();
    const datoss = datos;
    const id = idIndicador.toString();

    const formData = new FormData();
    formData.append('rubro', rubro);
    formData.append('datos', datoss);
    formData.append('idindicador', id);

    this._rubroService.postRubroIndicador(formData).subscribe((data: IRubro) => {
      this.nuevoGuardado.emit();
    }, error => {
      console.log('Error al guardar el rubro', error);
    });

    this.closeModal()
  }

  //Funcion que se llama desde en rubroComponent para abrir el modal y traerse los datos
  editarRubro() {
    // Verifica que haya un rubro seleccionado
    if (this.rubroSeleccionado) {
      // Abre el modal
      this.openModalRubro('Editar Rubro',
        'Excel (XLS|XLSX)', 'Solo se permiten archivos de extension .xlsc .xls', true,
        'Rubro', true,
        'editarRubro');
    }
  }

  //Funcion para actualizar el rubro.
  actualizarRubro(datos: File, idIndicador: number): void {
    const rubro = this.obtenerOpcionSeleccionada();
    const datoss = datos;
    const id = idIndicador.toString();

    const formData = new FormData();
    formData.append('rubro', rubro);
    formData.append('datos', datoss);
    formData.append('idindicador', id);

    this._rubroService.putRubro(idIndicador, formData).subscribe((data: IRubro) => {
      this.nuevoGuardado.emit();
    }, error => {
      console.log('Error al guardar el rubro', error);
    });

    this.closeModal()
  }

  //Metodo para obtener el rubro seleccionado y verificar que no sea nulo
  obtenerOpcionSeleccionada(): string {
    if (this.selectedOption !== null && this.selectedOption !== undefined) {
      return this.selectedOption;
    } else {
      return "";
    }
  }

  validarAlfanumerico() {
    if (this.alphanumericOnly === true) {
      const inputElement = this.inputElementRef.nativeElement;
      let value = inputElement.value;

      value = value.replace(/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]/g, '');
      value = value.toUpperCase();

      inputElement.value = value;
    }
  }
}