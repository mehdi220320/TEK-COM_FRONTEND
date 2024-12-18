import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {File2, Post} from "../../Models/Post";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {PostService} from "../../Services/post.service";

@Component({
  selector: 'app-community-gallery',
  templateUrl: './community-gallery.component.html',
  styleUrls: ['./community-gallery.component.css']
})
export class CommunityGalleryComponent implements OnInit {
  galery: File2[] = [];
  posts:Post[]=[]
  currentRoute: string = '';
  index=1;
  id!: string;

  post: Post = {
    id: 0,
    date_ajout: new Date(),
    whoposted: '',
    community: '',
    communityID:'',
    content: '',
    isVisible: true,
    commentList: [],
    likeList: [],
    selectedImageIndex: 0,
    showComments: false,
    fileList: []
  };
   ReinitializePost(){
     this.post = {
       id: 0,
       date_ajout: new Date(),
       whoposted: '',
       community: '',
       communityID:'',
       content: '',
       isVisible: true,
       commentList: [],
       likeList: [],
       selectedImageIndex: 0,
       showComments: false,
       fileList: []
     };
   }
  constructor(private router:Router,private route:ActivatedRoute,private sanitizer:DomSanitizer,private postService:PostService) {}

  ngOnInit(): void {
     this.currentRoute=this.router.url;
   this.loadGallery();

  }
  communityId:string="";
  loadGallery(){

    const parts = this.currentRoute.split('/');
     this.communityId = parts[2];
    this.postService.getPostByCommunityId(this.communityId).subscribe((response)=>{
      this.posts=response;
      for(let post of this.posts){
        if(post.fileList.length!=0){
          for(let file of post.fileList){
            this.galery.push(file);
          }
        }
      }
    },(error)=>{
      console.error("Can t fetch posts of community")
    })
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

  showImage(post: Post, index: number): void {
    post.selectedImageIndex = index;
  }

  getImageUrl(post: Post, index: number): SafeUrl | null {
    if (post.fileList && post.fileList[index]) {
      const file: File2 = post.fileList[index];
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
    return null;
  }

  getTimeSincePost(dateAjout: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - new Date(dateAjout).getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    return 'Just now';
  }


  inputValue: string = '';

  getPostByFile(file:File2){
    console.log(file.id)
      this.postService.getPostByFile(file.id).subscribe((response)=>{
        this.post=response;
        this.post.selectedImageIndex=0;
        this.post.showComments=true
        console.log("post ahawa ",this.post)
      },(error)=>{
        console.log("error fetching post");
      })
  }
  createComment(ngform:NgForm,post:Post){};
}
