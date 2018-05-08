import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AppService {
  constructor(private http: Http) {}

  scrap() {
    return this.http.get('http://lesjoiesducode.fr');
  }
}
