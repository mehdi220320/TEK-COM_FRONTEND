import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../Services/user-service.service";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {}

  existUser(email: string): Observable<boolean> {
    return this.userService.getuser2bymail2(email).pipe(
      map((response: any) => response !== null),
      catchError((error) => {
        console.error('Error checking user existence:', error);
        return of(false);
      })
    );
  }

  verifi(registerform: NgForm): void {
    const { nom, prenom, email, role, password, confirmpassword } = registerform.value;

    if (!nom || !prenom || !email || !role || !password || !confirmpassword) {
      alert('All fields marked with (*) are required.');
      return;
    }

    if (!this.isAlphabetical(nom)) {
      alert("First name must contain only alphabetic characters.");
      return;
    }

    if (!this.isAlphabetical(prenom)) {
      alert("Last name must contain only alphabetic characters.");
      return;
    }

    if (!this.isValidEmail(email)) {
      alert("The email address must have a valid format.");
      return;
    }

    if (!this.isValidPassword(password)) {
      alert("The password must be at least 8 characters long, contain at least one letter, and one number.");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match.");
      return;
    }

    this.isLoading = true;
    this.existUser(email).subscribe((exists: boolean) => {
      if (exists) {
        this.isLoading = false;
        alert('This user already exists.');
        return;
      }

      this.register(registerform);
    });
  }

  register(registerform: NgForm): void {
    this.userService.register(registerform.value).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        alert('Thank you for registering! Please log in now.');
        this.isLoading = false;
        this.gotologin();
      },
      (error) => {
        console.error('Registration error:', error);
        this.isLoading = false;
      }
    );
  }

  isAlphabetical(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }

  isValidEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  isValidPassword(password: string): boolean {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(password);
  }

  gotologin(): void {
    this.router.navigate(['/login']);
  }
}
