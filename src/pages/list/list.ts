import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import cheerio from 'cheerio';
import { StorageService } from '../../services/storage.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'list-page',
  templateUrl: 'list.html',
})
export class ListPage {

  posts = [];
  pageNumber = 1;
  page: any = {};
  showEmptyMessage = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private appService: AppService,
              private storageService: StorageService) {}

  ionViewDidLoad() {
    this.page = this.navParams.get('page');
    if (this.page.tag) {
      this.appService.scrap(this.page.tag).subscribe((response) => {
        const $ = cheerio.load(response.text());
        const posts = $('.blog-post');
        posts.toArray().map((post) => {
          const description = $(post).find('.blog-post-title a').text();
          const image = $(post).find('.blog-post-content img').attr('src');
          this.storageService.isFavorite({ image }).then((isFavorite) => {
            this.posts.push({ description, image, isFavorite });
          });
        });
      });
    } else {
      this.storageService.getAllFavoritePosts().then((posts) => {
        if (isEmpty(posts)) {
          this.showEmptyMessage = true;
        }
        this.posts = posts.map((post) => {
          post.isFavorite = true
          return post;
        });
        this.posts = this.storageService.paginate(this.posts, this.pageNumber);
      });
    }
  }

  doInfinite(infiniteScroll) {
    this.pageNumber = ++this.pageNumber;
    if (this.page.tag) {
      this.appService.scrap(this.page.tag, this.pageNumber).subscribe((response) => {
        const $ = cheerio.load(response.text());
        const posts = $('.blog-post');
        posts.toArray().map((post) => {
          const description = $(post).find('.blog-post-title a').text();
          const image = $(post).find('.blog-post-content img').attr('src');
          this.storageService.isFavorite({image}).then((isFavorite) => {
            this.posts.push({ description, image, isFavorite });
          });
        });
        infiniteScroll.complete();
      });
    } else {
      this.storageService.getAllFavoritePosts().then((posts) => {
        const aaa = this.storageService.paginate(posts, this.pageNumber);
        this.posts.push(...aaa);
        infiniteScroll.complete();
      });
    }
  }

  favoritePost(post) {
    this.storageService.favoritePost(post.image).then(() => {
      post.isFavorite = true;
    });
  }

  unfavoritePost(post) {
    this.storageService.unfavoritePost(post.image).then(() => {
      post.isFavorite = false;
    });
  }
}
