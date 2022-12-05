import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LocalCommonModule } from '../common/common.module';

const routes: Routes = [
  {
    path: 'login',
    //canActivate: // TODO: add eventually 
    component: LoginComponent,
  },
  {
    path: 'register',
    //canActivate: // TODO: add eventually 
    component: RegisterComponent,
  },
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LocalCommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthenticationModule { }
