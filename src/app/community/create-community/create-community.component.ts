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
  fileHandle: FileHandle | null = null; // Change to allow only one file  msg:String|undefined;
  msg: string | undefined;
  creationStatus: boolean | undefined;
  constructor(private sanitizer: DomSanitizer,private communityService:CommunityService) { }
  ngOnInit(): void {
    this.creationStatus=false;
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.fileHandle = { file, url };
    }
  }
  removeFileSelected(file:FileHandle){
    this.fileHandle = null;
  }
  changeStatus(status:boolean){
    this.creationStatus=status;
  }

  createCommunity(comForm: NgForm) {
    const formData = new FormData();
    formData.append('title', comForm.value.title);
    formData.append('description', comForm.value.description);
    formData.append('usercreate', localStorage.getItem('id') || '-1');
    if (this.fileHandle) {
      formData.append('image', this.fileHandle.file, this.fileHandle.file.name); // 'photo' should match the backend field name
    }    this.communityService.createCommunity(formData).subscribe(
      (response) => {
        console.log('Community created successfully:', response.message);
        this.msg = comForm.value.title;
        comForm.reset();
        this.changeStatus(true);
      },
      (error) => {
        console.error('Error creating community:', error);
      }
    );
  }


}
