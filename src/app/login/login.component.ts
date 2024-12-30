import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserServiceService} from "../Services/user-service.service";
import {UserAuthService} from "../Services/user-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  existinguser:boolean=true;
  isLoading = false;
  constructor(private userService: UserServiceService,
              private userAuthService:UserAuthService,
              private  router : Router) {
  }

  ngOnInit(): void {
  }
  login(loginform: NgForm) {
    this.isLoading = true;
    console.log(loginform.value);

    this.userService.login(loginform.value).subscribe(
      (response:any) => {
        console.log(response.token);
        console.log(response.role);
        this.userAuthService.setRoles(response.role);
        this.userAuthService.setToken(response.token);
        this.userAuthService.setEmail(response.email);
        this.userAuthService.setid(response.id);
        console.log(localStorage.getItem('roles'))
        const email=loginform.value['email'];
        const pass=loginform.value['password'];
        if(email==="" || pass===""){
          this.isLoading = false;
          return alert("les champs sont obligatoires ");
        }
        const role1 = response.role;
        if (role1 === 'STUD') {
          this.router.navigate(['/home']);
          this.isLoading = false;
        } else if (role1==='PROF')
        { this.router.navigate(['/home']);
          this.isLoading = false;}
        else if(role1 === 'ADMIN'){this.router.navigate(['/adminIndex']);this.isLoading = false;}


      },
      (error) => {
        this.existinguser=false;
        loginform.value['email']="";
        loginform.value['password']="";
      }
    );
  }
  /*existuser(loginform: NgForm) {
    this.userService.getuserbymail(loginform.value['email'])
      .subscribe(
        (response: any) => {
          if (response !== null) { this.existinguser= true ;
          }else {this.existinguser=false}
        }, (error) => {
          console.log(error);

        }
      );
  }}*/
}
