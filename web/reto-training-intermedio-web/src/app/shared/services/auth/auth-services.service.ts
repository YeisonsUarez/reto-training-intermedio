import { Injectable, NgZone } from '@angular/core';
import { UserModel as User } from '../dto/user-dto.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ComponentsPaths } from 'src/app/constants/components-paths';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // almacena los datos del usuario que inicio sesión
  constructor(
    public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone // NgZone es la implementación utilizada en angular para la ejecución de tareas asíncronas 
  ) {
    /* Guarda los datos del usuario el localStore al iniciar sesión
    cuando el usuario cierra sesión o el valor de user es nulo, quita el datos de usuario en localStorage*/
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Inicio de sesión con email y contraseña
  SignIn(errorMessage:string, pathResult:string,email: string, password: string) {
    return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate([pathResult]);
      });
      this.SetUserData(result.user);
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    });
  }
  // registro con email y contraseña
  SignUp(errorMessage:string, pathResult:string,email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([pathResult]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      });
  }
  // envia el correo de recuperación de cuenta
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail);
  }
  // valida que el usuario tenga la sesión iniciada
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  // Inicio de sesión con Google enviado los parametros al metodo AuthLogin
  GoogleAuth( errorMessage:string, pathResult:string) {
    return this.AuthLogin(errorMessage,pathResult, new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate([pathResult]);
      }
    });
  }
  // Logica para varios proveedores de inicio de sesión
  AuthLogin(errorMessage:string, pathResult:string,provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([pathResult]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      });
  }
  
  /* 
    Toma los datos del usuario que inicio sesión, llena el modelo de usuario y lo añade la base de datos FirebaseFirestore
   */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // elimina los datos del usuario de localStorage y redirije a iniciar sesión
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate([ComponentsPaths.PATH_LOGIN]);
    });
  }
}