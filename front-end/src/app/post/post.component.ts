import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService, Post} from "../auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<any>
  login: string = ''

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private _flashMessagesService: FlashMessagesService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.login = JSON.parse(localStorage.getItem('user')).login
    }

    this.post$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          // get post from database by its id
          return this.authService.getPostById(params['id'])
        })
      )
  }

  deletePost(id) {
    this.authService.deletePost(id).subscribe( (data: Post) => {
      if (!data.success) {
        this._flashMessagesService.show('Post was not deleted',
          { cssClass: 'alert-danger', timeout: 3000 });
      } else {
        this._flashMessagesService.show('Post was deleted',
          { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/'])
      }
    })
  }
}
