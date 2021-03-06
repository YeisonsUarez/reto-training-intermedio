import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/constants/messages';
import { AuthService } from 'src/app/shared/services/auth/auth-services.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ComponentsPaths } from 'src/app/constants/components-paths';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  /**
   * Atributo que contiene al controlador del formulario
   */
  public formController: FormGroup;

  constructor(public authService: AuthService, private router: Router) {
    this.formController = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.home();
    }
  }
  /**
   * Metodo encargado de iniciar sesión
   */
  public iniciarSesion() {
    if (this.validarformulario()) {
      this.authService
        .SignIn(Messages.FALLO_EN_INICIO_SESION,ComponentsPaths.PATH_HOME,
          this.formController.controls.email.value,
          this.formController.controls.password.value
        );
    }
  }
  /**
   * metodo encargado de validar el formulario
   * @returns Boolean
   */
  private validarformulario(): Boolean {
    if (this.formController.valid) {
      return true;
    } else {
      Swal.fire(Messages.FORMULARIO_DATOS_VACIOS);
      return false;
    }
  }
  /**
   * Metodo para abrir la pagina de registrarse
   */
  public singUp() {
    this.router.navigate([ComponentsPaths.PATH_REGISTRO]);
  }

  /**
   * Metodo para abrir la pagina de olvide mi contrasena
   */
  public forgotPassWord() {
    this.router.navigate([ComponentsPaths.PATH_FORGOT_PASSWORD]);
  }

  /**
   * Metodo para abrir la pagina de home
   */
  public home() {
    this.router.navigate([ComponentsPaths.PATH_HOME]);
  }

  /**
   * Metodo encargado de abrir el modal de Google para iniciar sesión
   */
  public singInGoogle() {
    this.authService
      .GoogleAuth(Messages.FALLO_EN_REGISTRO, ComponentsPaths.PATH_HOME);
  }
}
