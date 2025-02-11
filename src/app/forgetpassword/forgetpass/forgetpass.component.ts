import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user-service.service";
import {UserAuthService} from "../../Services/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  isLoading = false;



  constructor(private userService: UserServiceService,
              private userAuthService:UserAuthService,
              private  router : Router,

              private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {

  }
  forgetpass2(forgetpass2Form: NgForm) {
    this.isLoading = true;

    this.route.queryParams.subscribe(queryParams => {
        const token = queryParams['token'];
        const decodedToken = jwt_decode(token) as { [key: string]: string };
        const email = decodedToken['sub'];
        this.userAuthService.setEmail(email);
        const pass1=forgetpass2Form.value['newpassword'];
        const pass2=forgetpass2Form.value['confirmpassword'];
        if(pass1==="" || pass2===""){
          return alert("les champs sont obligatoire ");}
        if(!this.isValidPassword(pass1)){
          return alert(" Votre mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre et un chiffre. ")
          this.isLoading = false;


        }
        if(pass1!=pass2){return alert("les mot de pass ne correspond pas ")}
        else {    this.isLoading = true;

          this.userService.forgetpass2(forgetpass2Form.value).subscribe(
            (response: any) => {
              console.log(email);
              console.log("mdp changer");
              this.userAuthService.clear();
              alert("Votre mot de passe a été modifié avec succès. Merci de vous connecter. ")
              this.isLoading = false;

              this.router.navigate(['/login']);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },

    );
  }

  isValidPassword(password: string): boolean {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return pattern.test(password);
  }

}
