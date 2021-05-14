import { Component, OnInit } from '@angular/core';
import {AuthService, Post} from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  category: string
  posts: Post[] = []

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAllPosts().subscribe((posts: Post[]) =>
      this.posts = posts,
      // console.log('posts', this.posts)
      (err) => {},
        // cut length of post:
      () => {
        for (let i = 0; i < this.posts.length; i++) {
          // console.log('this.posts[i].text', this.posts[i].text)
          this.posts[i].text = this.posts[i].text.substring(0, 250)
        }
      }
    )
  }

  setCategory(category) {
    this.category = category
    // console.log('this.category', this.category);
  }
}

