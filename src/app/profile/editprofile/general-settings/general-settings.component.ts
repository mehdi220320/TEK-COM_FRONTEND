import { Component, OnInit } from '@angular/core';
import {User} from "../../../Models/User";
import {ActivatedRoute} from "@angular/router";
import {UserServiceService} from "../../../Services/user-service.service";
import {DomSanitizer} from "@angular/platform-browser";
import {StudentService} from "../../../Services/student.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {
  user: User = {
    id: -1,
    nom: "",
    prenom: "",
    usernamez: "",
    email: "",
    isactive: "",
    role: "",
    status: "",
    bio: "",
    image: {
      id: "",
      fileName: "",
      fileType: "",
      data: new Uint8Array
    }
  };
  id=localStorage.getItem('id')
  job: string = ""

  constructor( private route: ActivatedRoute, private userService: UserServiceService, private sanitizer: DomSanitizer, private studentService: StudentService) {
  }
  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe((response) => {
      this.user = response;
      this.getTheJob(this.user.role)
    }, error => console.error("user profile can t fetch user"));

  }
  getTheJob(role: any) {
    console.log("User object:", this.user);
    if (role === 'STUD') {
      console.log("ey STUD el rajel");
      this.studentService.getClasseByID(this.id).subscribe((response) => {
        this.job = response;
        console.log("job", this.job);
      });
    }
  }

  update(updateForm: NgForm) {
    this.user.nom=updateForm.value['settingsFirstName']
    this.user.prenom=updateForm.value['settingsLastName']
    this.user.email=updateForm.value['settingsemail']
    this.user.bio=updateForm.value['settingsbio']
    if (this.user.role==="STUD")
      this.job=updateForm.value['settingsclass']
    this.userService.updateUser(this.user,this.job).subscribe((response)=>{
      console.log(" user updated ")
    })
  }
}
