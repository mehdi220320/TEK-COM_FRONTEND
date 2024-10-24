import { Component, OnInit } from '@angular/core';
import {Post} from "../Models/Post";
import {Likes} from "../Models/Likes";
import {FileHandle} from "../Models/FileHandle";
import {Comments} from "../Models/Comments";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
   posts: Post[] = [
    new Post(
      1,
      new Date(2023, 9, 17, 10, 30),
      'Jean Dupont',
      'Community A',
      true,
      [
        { file: new File([], 'img_1.png'), url: './assets/images/img_1.png' },
        { file: new File([], 'post-1.jpg'), url: './assets/images/posts/post-1.jpg' }
      ],
      'This is the description of the first post.',
      [
        new Comments('Alice', 'Great post!', new Date(2023, 9, 17, 11, 30)),
        new Comments('Bob', 'Thanks for sharing!', new Date(2023, 9, 17, 12, 45))
      ],
      [
        new Likes(1, 101, 1),
        new Likes(2, 102, 1)
      ]
    ),
    new Post(
      2,
      new Date(2023, 9, 16, 12, 15),
      'Marie Curie',
      'Community B',
      false,
      [
        { file: new File([], 'post-1.jpg'), url: './assets/images/posts/post-1.jpg' },
        { file: new File([], 'img_1.png'), url: './assets/images/img_1.png' }
      ],
      'This is another post description, belonging to Community B.',
      [
        new Comments('Charlie', 'Interesting topic!', new Date(2023, 9, 16, 13, 0))
      ],
      [
        new Likes(3, 103, 2),
        new Likes(4, 104, 2)
      ]
    ),
    new Post(
      3,
      new Date(2023, 9, 15, 9, 45),
      'Albert Einstein',
      'Community A',
      true,
      [
        { file: new File([], 'post-1.jpg'), url: './assets/images/posts/post-1.jpg' },
        { file: new File([], 'img.png'), url: './assets/images/img.png' }
      ],
      'Post description about scientific discoveries in Community A.',
      [],
      [
        new Likes(5, 105, 3)
      ]
    ),
    new Post(
      4,
      new Date(2023, 9, 14, 14, 0),
      'Isaac Newton',
      'Community C',
      true,
      [
        { file: new File([], 'post-1.jpg'), url: './assets/images/posts/post-1.jpg' }
      ],
      'A brief post discussing physics in Community C.',
      [],
      [
        new Likes(6, 106, 4),
        new Likes(7, 107, 4)
      ]
    ),
    new Post(
      5,
      new Date(2023, 9, 13, 11, 25),
      'Ada Lovelace',
      'Community D',
      false,
      [
        { file: new File([], 'post-1.jpg'), url: './assets/images/posts/post-1.jpg' },
        { file: new File([], 'img_1.png'), url: './assets/images/img_1.png' },
        { file: new File([], 'img.png'), url: './assets/images/img.png' }
      ],
      'Exploring algorithms in this insightful post for Community D.',
      [],
      [
        new Likes(8, 108, 5),
        new Likes(9, 109, 5)
      ]
    ),
    new Post(
      6,
      new Date(2024, 10, 17, 17, 45),
      'Ada Lovelace',
      'Community D',
      false,
      [],
      'Exploring algorithms in this insightful post for Community D.',
      [],
      [
        new Likes(10, 110, 6)
      ]
    )
  ];
  ngOnInit(): void {
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
