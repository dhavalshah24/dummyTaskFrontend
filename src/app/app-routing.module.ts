import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/user-authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './components/user-authentication/login/login.component';
import { SignupComponent } from './components/user-authentication/signup/signup.component';

const routes: Routes = [
  {
    path: "login", 
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordComponent
  },
  {
    path: "**",
    redirectTo: "/login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
