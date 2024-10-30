import { Component, OnInit } from '@angular/core';
import {Post} from "../Models/Post";
import {Likes} from "../Models/Likes";
import {FileHandle} from "../Models/FileHandle";
import {Comments} from "../Models/Comments";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import{PostService} from '../Services/post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    const postId = 1;

    this.postService.getPostById(postId).subscribe((data: any) => {
      this.posts = data.map((item: any) => {
        return new Post(
          item.id,
          item.date_ajout,
          item.whoposted,
          item.community,
          item.content,
          item.isvisible,
          [],
          item.commentList,
          item.likeList,
          0
        );
      });
    }, (error) => {
      console.error("Error fetching posts:", error);
    });
  }
  selectedImageIndex: number = 0;

  showImage(post: Post, index: number) {
    post.selectedImageIndex = index;
  }
  getTimeSincePost(dateAjout: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - new Date(dateAjout).getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24*365));

    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if(days < 366) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }else{
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
  showComments: boolean = false;
  toggleComments() {
    this.showComments = !this.showComments;
  }

}
