import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AppService {
  constructor(private http: Http) {}

  scrap() {
    const options = {
      headers: {
        "Content-Type": "text/html",
        "Accept": "text/html",
      }
    }
    return this.http.get('http://lesjoiesducode.fr');
  }
}
