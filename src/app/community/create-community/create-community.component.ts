import { Component, OnInit } from '@angular/core';
import {FileHandle} from "../../Models/FileHandle";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {
  fileHandle: FileHandle[] =[];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
}
