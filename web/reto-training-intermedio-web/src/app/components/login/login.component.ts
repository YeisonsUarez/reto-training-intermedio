import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/constants/messages';
import { AuthService } from 'src/app/shared/services/auth-services.service';
import Swal from 'sweetalert2';
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

  constructor(public authService: AuthService) {
    this.formController = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  /**
   * Metodo encargado de iniciar sesión
   */
  public iniciarSesion() {
    if (this.validarformulario()) {
      this.authService.SignIn(
        this.formController.controls.email.value,
        this.formController.controls.password.value
      );
    }
    return;
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
  public abrirPaginaRegistro() {}

  /**
   * Metodo para abrir la pagina de olvide mi contrasena
   */
  public abrirPaginaOlvideContrasena() {}
}
