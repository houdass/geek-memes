import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

  constructor(private http: Http) {}

  scrap(tag, page) {
    if (page) {
      return this.http.get(`http://lesjoiesducode.fr/tag/${tag}/page/${page}`);
    }
    return this.http.get(`http://lesjoiesducode.fr/tag/${tag}`);
  }

  scrapRandom(url) {
    return this.http.get(url);
  }
}
