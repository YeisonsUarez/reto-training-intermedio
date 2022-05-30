import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ComponentsPaths } from './constants/components-paths';



@NgModule({
  imports: [RouterModule.forRoot(
    [
      {path: ComponentsPaths.PATH_VACIO, component: HomeComponent},
      {path: ComponentsPaths.PATH_HOME, component: HomeComponent},
      {path: ComponentsPaths.PATH_LOGIN, component: LoginComponent},
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
