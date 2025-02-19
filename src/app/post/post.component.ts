import { Component, OnInit } from '@angular/core';
import {File2, Post} from "../Models/Post";
import {Likes} from "../Models/Likes";
import {FileHandle} from "../Models/FileHandle";
import {Comments} from "../Models/Comments";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import{PostService} from '../Services/post.service'
import {NgForm} from "@angular/forms";
import { User } from '../Models/User';
import { Router } from '@angular/router';
import {NotificationService} from "../Services/notification.service";
import {CommunityService} from "../Services/community.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  UserLOGINiD= localStorage.getItem('id');
  selectedImageIndex: number = 0;
  currentRoute: string = '';
  isMemberOfCommunity: boolean = false;
  communities: any[] = [];
  constructor(private communityService: CommunityService ,private notificationService:NotificationService,private postService: PostService, private sanitizer: DomSanitizer,private router:Router) {}


  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.loadPosts();
    this.checkUserMembership();
  }

  loadPosts(): void {
    if(this.currentRoute==="/home" || this.currentRoute==="/profile" ){
      this.postService.getPostByUserId(localStorage.getItem('id')).subscribe(
        (data: Post[]) => {
          this.posts = data.map(post => ({ ...post, selectedImageIndex: 0 }));
          console.log("Posts with fileList:", this.posts);
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );
    }
    else if (this.currentRoute.startsWith("/profile")){
      const parts = this.currentRoute.split('/');
      const userID = parts[2];
      this.postService.getuserPosts(userID).subscribe(
        (data: Post[]) => {
          this.posts = data.map(post => ({ ...post, selectedImageIndex: 0 }));
          console.log("Posts with fileList:", this.posts);
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );
    }
    else {
      const parts = this.currentRoute.split('/');
      const communityId = parts[2];
      this.postService.getPostByCommunityId(communityId).subscribe(
        (data: Post[]) => {
          this.posts = data.map(post => ({ ...post, selectedImageIndex: 0 }));
          console.log("Posts with fileList:", this.posts);
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );
    }
  }
  checkUserMembership(): void {
    this.communityService.getCommunitybyUserID(localStorage.getItem('id')).subscribe(
      (response) => {
        this.communities = response;
        if (this.communities.length > 0) {
          this.isMemberOfCommunity = true; // User is a member of a community
        }
      },
      (error) => {
        console.log("Can't fetch getCommunitybyUserID", error);
      }
    );
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

  toggleComments(post: Post): void {
    post.showComments = !post.showComments;
  }
  inputValue: string = '';

  createComment(commentForm: NgForm, post: Post): void {

    this.postService.addComment(commentForm.value.description, localStorage.getItem('id'), post.id).subscribe(
      (response) => {
        console.log('Comment created successfully:', response);
        const newComment: Comments = {
          id: response.id,
          description: response.description,
          date: new Date(response.date),
          username: response.username,
          postid: response.postid
        };

        const postToUpdate = this.posts.find(p => p.id === post.id);
        if (postToUpdate) {
          postToUpdate.commentList.unshift(newComment);
        }
        this.notificationService.addNotification(localStorage.getItem('id'),post.id,"COMMENT").subscribe(
          (response)=>{
            console.log(response)
          },error => console.log("notification ma mchatech"+error)
        );
        commentForm.reset();
      },
      (error) => {
        console.error('Error creating comment:', error);
      }
    );
  }
  pressLike(postId: number): void {
    this.postService.pressLike(this.UserLOGINiD, postId).subscribe(
      (response) => {
        console.log("Successfully liked the post");
        const parsedId = this.UserLOGINiD ? parseInt(this.UserLOGINiD, 10) :-1;
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          const existingLikeIndex = post.likeList.findIndex(like => like.userID === parsedId);

          if (existingLikeIndex === -1) {
            post.likeList.push({ id: response.id, userID: parsedId, postid: postId });
            this.notificationService.addNotification(localStorage.getItem('id'),postId,"LIKE").subscribe(
              (response)=>{
                console.log(response)
              },error => console.log("notification ma mchatech"+error)
            );
          } else {
            post.likeList.splice(existingLikeIndex, 1);
          }
        }
      },
      (error) => {
        console.error("Error liking the post", error);
      }
    );
  }
  checkLike(userID: any, post: Post): boolean {
    const parsedId = this.UserLOGINiD ? parseInt(this.UserLOGINiD, 10) : null;

    if (parsedId === null) {
      return false;
    }
    return post.likeList.some(item => item.userID === parsedId);
  }


  redirectToReport(postId: number) {
    debugger;
    this.router.navigate(['/reportpost'], { queryParams: { postId } });
  }



}
