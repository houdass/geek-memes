import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import cheerio from 'cheerio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  randomPageUrl;
  post = {}

  constructor(public navCtrl: NavController, private appService: AppService) {}

  ionViewDidLoad() {
    this.reload()
  }

  randomPageData() {
    this.appService.scrapRandom(this.randomPageUrl).subscribe((response) => {
      const $ = cheerio.load(response.text());
      const posts = $('.blog-post');

      posts.toArray().map((post) => {
        this.randomPageUrl = $('.fa-random').parent().attr('href');
        const description = $(post).find('h1.blog-post-title').text();
        const image = $(post).find('.blog-post-content img').attr('src');
        this.post = { description, image };
      });
    });
  }

  reload() {
    if (this.randomPageUrl) {
      this.randomPageData();
    } else {
      this.appService.scrapRandom('https://lesjoiesducode.fr').subscribe((response) => {
        const $ = cheerio.load(response.text());
        this.randomPageUrl = $('.fa-random').parent().attr('href');
        this.randomPageData();
      });
    }
  }
}
