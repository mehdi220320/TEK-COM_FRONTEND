import { Component, OnInit } from '@angular/core';
import {Post} from "../Models/Post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [
    new Post(
      1,
      new Date(2023, 9, 17, 10, 30), // October is month 9 (0-indexed)
      'Jean Dupont',
      'Community A',
      true,
      ['./assets/images/img_1.png', './assets/images/posts/post-1.jpg'],
      'This is the description of the first post.'
    ),
    new Post(
      2,
      new Date(2023, 9, 16, 12, 15),
      'Marie Curie',
      'Community B',
      false,
      ['./assets/images/posts/post-1.jpg', './assets/images/img_1.png'],
      'This is another post description, belonging to Community B.'
    ),
    new Post(
      3,
      new Date(2023, 9, 15, 9, 45),
      'Albert Einstein',
      'Community A',
      true,
      ['./assets/images/posts/post-1.jpg', './assets/images/img.png'],
      'Post description about scientific discoveries in Community A.'
    ),
    new Post(
      4,
      new Date(2023, 9, 14, 14, 0),
      'Isaac Newton',
      'Community C',
      true,
      ['./assets/images/posts/post-1.jpg'],
      'A brief post discussing physics in Community C.'
    ),
    new Post(
      5,
      new Date(2023, 9, 13, 11, 25),
      'Ada Lovelace',
      'Community D',
      false,
      ['./assets/images/posts/post-1.jpg', './assets/images/img_1.png', './assets/images/img.png'],
      'Exploring algorithms in this insightful post for Community D.'
    )
  ];
  constructor() { }

  ngOnInit(): void {
  }
  selectedImageIndex: number = 0;

  showImage(post: Post, index: number) {
    post.selectedImageIndex = index;
  }
}
