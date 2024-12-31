import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../Services/notification.service";
import {Notification} from "../../Models/Notification";
import {File2, Post} from "../../Models/Post";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {Comments} from "../../Models/Comments";
import {PostService} from "../../Services/post.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications:Notification[]=[];
  NotSeen:number=0;
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
  UserLOGINiD= localStorage.getItem('id');
  inputValue: string = '';

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
  constructor(private notificationService:NotificationService,private sanitizer: DomSanitizer,private postService:PostService) { }

  ngOnInit(): void {
    this.notificationService.getNotificationByUser(localStorage.getItem('id')).subscribe((response)=>
    {
      this.notifications=response;
      for(let notification of this.notifications){
        if(!notification.seen){
          this.NotSeen+=1
        }
      }
    },error => {
      console.error("can t get notifications list")
    })
  }
  getPost( post:Post,id:any){
    this.post=post
    this.post.selectedImageIndex=0
    this.post.showComments=true
    this.notificationService.updateSeenNotification(id).subscribe((response)=> {
      console.log("Notification"+response+" is seen ");
      const notification = this.notifications.find(notif => notif.id === id);
      if (notification) {
        notification.seen = true;
        this.NotSeen-=1
      }
    }
    ,error => console.log("Can't make notification seen :"+error ) );

  }
  getImageURL(image: any): any {
    if (image === null) {
      return 'assets/images/users/user-1.jpg';
    } else {
      const file: File2 = image;
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
  }
  getTimeSincePost(date: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - new Date(date).getTime();

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
  getNotificationType(notification: Notification): string {
    let msg = '';
    if (notification.type === 'LIKE') {
      msg = `has liked your post with content of <strong>${this.getTruncatedContent(notification.post.content)}</strong>`;
    } else if (notification.type === 'COMMENT') {
      msg = `has commented on your post with content of <strong>${this.getTruncatedContent(notification.post.content)}</strong>`;
    }
    return msg;
  }

  getTruncatedContent(content: string): string {
    const words = content.split(' ');
    return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : content;
  }
  showImage(post: Post, index: number): void {
    post.selectedImageIndex = index;
  }

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
        this.post.commentList.unshift(newComment);
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
    this.postService.pressLike(this.UserLOGINiD, this.post.id).subscribe(
      (response) => {
        console.log("Successfully liked the post");
        const parsedId = this.UserLOGINiD ? parseInt(this.UserLOGINiD, 10) :-1;
        if (this.post.id) {
          const existingLikeIndex = this.post.likeList.findIndex(like => like.userID === parsedId);

          if (existingLikeIndex === -1) {
            this.post.likeList.push({ id: response.id, userID: parsedId, postid: postId });
            this.notificationService.addNotification(localStorage.getItem('id'),postId,"LIKE")
          } else {
            this.post.likeList.splice(existingLikeIndex, 1);
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
  getImageUrl(post: Post, index: number): SafeUrl | null {
    if (post.fileList && post.fileList[index]) {
      const file: File2 = post.fileList[index];
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
    return null;
  }

}
