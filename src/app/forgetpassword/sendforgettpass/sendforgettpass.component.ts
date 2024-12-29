import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user-service.service";
import {UserAuthService} from "../../Services/user-auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-sendforgettpass',
  templateUrl: './sendforgettpass.component.html',
  styleUrls: ['./sendforgettpass.component.css']
})
export class SendforgettpassComponent  implements OnInit {
  showalert: boolean=false;
  constructor(private userService: UserServiceService,
              private userAuthService:UserAuthService,
              private  router : Router) {
  }


  ngOnInit(): void {
  }
  forgetpass(forgetform: NgForm) {
    this.existUser(forgetform).subscribe((exists: boolean) => {
      if (exists) {
        this.userService.forgetpass(forgetform.value).subscribe(
          (response:any) => {

            console.log(response);
            alert("Veuillez consulter votre boite E-mail")
            this.router.navigate(['/login']);

          },
          (error) => {
            console.log(error);
          }
        );}else {this.showalert=true;}});
  }
  existUser(form: NgForm): Observable<boolean> {
    return this.userService.getuser2bymail2(form.value['email'])
      .pipe(
        map((response: any) => {
          console.log(response)
          if (response == null) {
            return false;
          } else {
            return true;
          }
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }
}
