import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import { StorageService } from '../../services/storage.service';
import { isEmpty } from 'lodash';
import { Post } from '../../shared/post.model';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'list-page',
  templateUrl: 'list.html',
})
export class ListPage {

  posts: Array<Post> = [];
  pageNumber = 1;
  page: any = {};
  showEmptyMessage = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private appService: AppService,
              private storageService: StorageService,
              private networkService: NetworkService) {}

  ionViewDidLoad() {
    this.storageService.isComplete = false;
    this.page = this.navParams.get('page');
    if (this.page.tag) {
      this.appService.scrapV2(this.page.tag).subscribe((posts) => {
        this.posts = posts;
      })
    } else {
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
    this.pageNumber = ++this.pageNumber;
    if (this.page.tag) {
      if (this.networkService.checkNetwork()) {
        this.appService.scrapV2(this.page.tag, this.pageNumber).subscribe((posts) => {
          this.posts.push(...posts);
          infiniteScroll.complete();
        });
      }
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
  }
}
