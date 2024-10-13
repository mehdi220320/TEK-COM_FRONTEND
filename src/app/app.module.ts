import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { ANavbarComponent } from './AdminView/a-navbar/a-navbar.component';
import { UsersTablePanelComponent } from './AdminView/users-table-panel/users-table-panel.component';
import {HttpClientModule} from "@angular/common/http";
import {UserServiceService} from "./Services/user-service.service";
const appRoutes:Routes=[
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"",component:LoginComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"adminIndex",component:ANavbarComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    PostComponent,
    ANavbarComponent,
    UsersTablePanelComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
],
  exports:[RouterModule],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
