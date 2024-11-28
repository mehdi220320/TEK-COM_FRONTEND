import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {File2} from "../../Models/Post";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-community-gallery',
  templateUrl: './community-gallery.component.html',
  styleUrls: ['./community-gallery.component.css']
})
export class CommunityGalleryComponent implements OnInit {
  galery: File2[] = [];
  index=1;

  constructor(private route: ActivatedRoute,private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['galery']) {
        this.galery = JSON.parse(params['galery']);
        console.log("test dra 9adah"+this.galery.length)}

    });
  }
  getImageURL(image:any):any{
    if(image===null)
      if(this.index++%2==1)
        return  'assets/images/background/img.png'
      else
        return 'assets/images/users/user-1.jpg'
    else {
      const file: File2 = image;
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
  }

}
