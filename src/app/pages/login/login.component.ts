import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router:Router){}

  //Hacer lógica para recuperar la contraseña, puede servir de ayuda el proyecto "Template-Angular-Main" del gobierno
  openModal(){
    alert("TO DO");
  }

  login(){
    this.router.navigateByUrl('/dashboard')
  }
}
