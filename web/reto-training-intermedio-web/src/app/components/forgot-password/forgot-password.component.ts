import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentsPaths } from 'src/app/constants/components-paths';
import { Messages } from 'src/app/constants/messages';
import { AuthService } from 'src/app/shared/services/auth/auth-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [],
})
export class ForgotPasswordComponent implements OnInit {
  /**
   * Atributo que contiene al controlador del formulario
   */
  public formController: FormGroup;

  constructor(public authService: AuthService, private router: Router) {
    this.formController = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  /**
   * Metodo para enviar el correo para recuperar la contrasena
   */
  public forgotPassword() {
    if(this.validarformulario()){
      this.authService.ForgotPassword(this.formController.controls.email.value).then(() => {
        Swal.fire(Messages.CORREO_RECUPERAR_CONTRASENA_ENVIADO);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: Messages.FALLO_ENVIO_RECUPERACION_CONTRASENA,
        })
      });
    }
    
  }

  /**
   * Metodo que abre la pantalla de login
   */
  public signIn() {
    this.router.navigate([ComponentsPaths.PATH_LOGIN]);
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
}
