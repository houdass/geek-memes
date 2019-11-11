import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { isEmpty } from 'lodash';
import { Post } from '../../shared/post/post.model';
import { PageService } from "../../services/page.service";

@Component({
  selector: 'list-page',
  templateUrl: 'list.html',
})
export class ListPage {

  posts: Array<Post> = [];
  pageNumber = 1;
  page: any = {};
  showEmptyMessage = false;
  noPosts = true;
  length: number;

  constructor(public navParams: NavParams,
              private pageService: PageService,
              private storageService: StorageService) {}

  ionViewDidLoad() {
    this.storageService.isComplete = false;
    this.page = this.navParams.get('page');
    if (this.page.tag) {
      this.pageService.get(this.page.tag).subscribe((posts) => {
        this.noPosts = false;
        this.posts = posts.slice(0, 4);
        this.length = posts.length;
        this.posts.length = 4;
      })
    } else {
      this.noPosts = false;
      this.storageService.getAllFavoritePosts().then((posts) => {
        if (isEmpty(posts)) {
          this.showEmptyMessage = true;
        } else {
          this.posts = this.storageService.paginate(posts, this.pageNumber);
        }
      });
    }
  }

  isEmptyMessage() {
    this.storageService.getAllFavoritePosts().then((posts) => {
      if (isEmpty(posts)) {
        this.showEmptyMessage = true;
      }
    });
  }

  doInfinite(infiniteScroll) {
    if (this.page.tag) {
        this.pageService.get(this.page.tag).subscribe((posts) => {
          this.posts.push(...posts.slice(this.pageNumber*4, this.pageNumber*4 + 4));
          infiniteScroll.complete();
        });
    } else {
      if (!this.storageService.isComplete) {
        this.storageService.getAllFavoritePosts().then((posts) => {
          const favoritePosts = this.storageService.paginate(posts, this.pageNumber);
          this.posts.push(...favoritePosts);
          infiniteScroll.complete();
        });
      } else {
        infiniteScroll.complete();
      }
    }
    this.pageNumber = ++this.pageNumber;
  }
}
