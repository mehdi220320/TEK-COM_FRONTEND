import { Component, OnInit } from '@angular/core';
import {FileHandle} from "../../Models/FileHandle";
import {DomSanitizer} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {CommunityService} from "../../Services/community.service";
import {Community} from "../../Models/Community";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {
  fileHandle: FileHandle[] =[];
  msg:String|undefined;
  constructor(private sanitizer: DomSanitizer,private communityService:CommunityService) { }
   creationStatus: boolean | undefined;
  ngOnInit(): void {
    this.creationStatus=false;
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.fileHandle.push({ file, url });
    }
  }
  removeFileSelected(file:FileHandle){
    let index = this.fileHandle.indexOf(file);
    if (index !== -1) {
      this.fileHandle.splice(index, 1);
    }
  }
  changeStatus(status:boolean){
    this.creationStatus=status;
  }
  createCommunity(comForm: NgForm) {
    const formData = new FormData();
    formData.append('title', comForm.value.title);
    formData.append('description', comForm.value.description);
    formData.append('usercreate', '1');

    this.communityService.createCommunity(formData).subscribe(
      (response) => {
        console.log('Community created successfully:', response.message);
        this.msg=comForm.value.title
        comForm.reset();
        this.changeStatus(true);
      },
      (error) => {
        console.error('Error creating community:', error);
      }
    );
  }


}
