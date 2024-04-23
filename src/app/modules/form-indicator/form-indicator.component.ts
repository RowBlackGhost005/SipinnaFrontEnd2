import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDominio } from '../../models/dominio.model';
import { DominioService } from '../../services/dominio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-indicator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-indicator.component.html',
  styleUrl: './form-indicator.component.scss'
})
export class FormIndicatorComponent {
  formularioContacto: FormGroup
  dominiosData: IDominio[] = [];
  private _dominioService = inject(DominioService);

  constructor(private form: FormBuilder) {
    this.formularioContacto = this.form.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this._dominioService.getDominios().subscribe((data: IDominio[]) => {
      this.dominiosData = data;
    })
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioContacto.get(controlName)?.hasError(errorType) && this.formularioContacto.get(controlName)?.touched
  }
}
