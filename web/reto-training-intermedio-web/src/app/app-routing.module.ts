import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerUserListComponent } from './components/answer-user-list/answer-user-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionUserListComponent } from './components/question-user-list/question-user-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { ComponentsPaths } from './constants/components-paths';



@NgModule({
  imports: [RouterModule.forRoot(
    [
      {path: ComponentsPaths.PATH_VACIO, component: LoginComponent},
      {path: ComponentsPaths.PATH_HOME, component: HomeComponent},
      {path: ComponentsPaths.PATH_LOGIN, component: LoginComponent},
      {path: ComponentsPaths.PATH_REGISTRO, component: SignupComponent},
      {path: ComponentsPaths.PATH_FORGOT_PASSWORD, component: ForgotPasswordComponent},
      {path: ComponentsPaths.PATH_QUESTIONS_USER_LIST, component:QuestionUserListComponent},
      {path: ComponentsPaths.PATH_ANSWER_USER_LIST, component:AnswerUserListComponent}
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
