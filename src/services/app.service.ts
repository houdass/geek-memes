import cheerio from 'cheerio';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../shared/post/post.model';
import { head } from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppService {

  randomPageUrl;
  options = { responseType:  'text' as 'json' }

  constructor(private httpClient: HttpClient) {}

  scrap(tag, page?) {
    if (page) {
      return this.httpClient.get<any>(`http://lesjoiesducode.fr/tag/${tag}/page/${page}`, this.options)
    }
    return this.httpClient.get<any>(`http://lesjoiesducode.fr/tag/${tag}`, this.options)
  }

  scrapV2(tag, page?) {
    let subscription = this.httpClient.get<any>(`http://lesjoiesducode.fr/tag/${tag}`, this.options)
    if (page) {
      subscription = this.httpClient.get<any>(`http://lesjoiesducode.fr/tag/${tag}/page/${page}`, this.options)
    }
    return subscription.map((response) => {
      const $ = cheerio.load(response);
      const posts = $('.blog-post');
      let result: Array<Post> = [];
      posts.toArray().map((post) => {
        result.push(this.getPostFromCheerio($, post));
      });
      return result;
    });
  }

  scrapRandom(): Observable<Post> {
    if (this.randomPageUrl) {
      return this.httpClient.get<any>(this.randomPageUrl, this.options)
        .map((response) => {
          const $ = cheerio.load(response);
          const posts = $('.blog-post');
          const post = head(posts);
          this.randomPageUrl = $('.fa-random').parent().attr('href');
          return this.getPostFromCheerio($, post);
        })
        .catch(this.handleError);
    } else {
      return this.httpClient.get<any>('https://lesjoiesducode.fr', this.options)
        .switchMap((response) => {
          const $ = cheerio.load(response);
          this.randomPageUrl = $('.fa-random').parent().attr('href');
          return this.scrapRandom();
        })
        .catch(this.handleError);
    }
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  private getPostFromCheerio($, post) {
    const description = $(post).find('h1.blog-post-title').text();
    const image = $(post).find('.blog-post-content img').attr('src');
    return new Post(description, image, false );
  }
}
