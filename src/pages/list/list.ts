import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import cheerio from 'cheerio';

@Component({
  selector: 'list-page',
  templateUrl: 'list.html',
})
export class ListPage {

  posts = [];
  pageNumber = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {}

  ionViewDidLoad() {
    const page = this.navParams.get('page');
    this.appService.scrap(page.tag).subscribe((response) => {
      const $ = cheerio.load(response.text());
      const posts = $('.blog-post');
      debugger
      posts.toArray().map((post) => {
        const description = $(post).find('.blog-post-title a').text();
        const image = $(post).find('.blog-post-content img').attr('src');
        this.posts.push({ description, image });
      });
    });
  }

  doInfinite(infiniteScroll) {
    this.pageNumber = ++this.pageNumber;
    const page = this.navParams.get('page');
    this.appService.scrap(page.tag, this.pageNumber).subscribe((response) => {
      const $ = cheerio.load(response.text());
      const posts = $('.blog-post');
      posts.toArray().map((post) => {
        const description = $(post).find('.blog-post-title a').text();
        const image = $(post).find('.blog-post-content img').attr('src');
        this.posts.push({ description, image });
      });
      infiniteScroll.complete();
    });
  }
}
