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

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {}

  ionViewDidLoad() {
    this.appService.scrap().subscribe((response: any) => {
      const $ = cheerio.load(response.text());
      debugger
      const posts = $('.blog-post');
      posts.toArray().map((post) => {
        const description = $(post).find('.blog-post-title a').text();
        const image = $(post).find('.blog-post-content img').attr('src');
        this.posts.push({ description, image })
      });
    });
  }
}
