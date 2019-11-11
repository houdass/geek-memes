import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import { forkJoin } from "rxjs/observable/forkJoin";
import { of } from "rxjs/observable/of";
import { shuffle } from "lodash";

import { best } from '../assets/pages/best'
import { chef } from '../assets/pages/chef'
import { client } from '../assets/pages/client'
import { commercial } from '../assets/pages/commercial'
import { fail } from '../assets/pages/fail'
import { rage } from '../assets/pages/rage'
import { stagiaire } from '../assets/pages/stagiaire'
import { win } from '../assets/pages/win'
import { wtf } from '../assets/pages/wtf'

const posts = {
  best,
  chef,
  client,
  commercial,
  fail,
  rage,
  stagiaire,
  win,
  wtf
}

@Injectable()
export class PageService {
  randomPosts = [];
  constructor() {}

  get(tag = 'best') {
    return of(posts[tag]).map((result) => shuffle(result)).delay(500);
  }

  getRandom() {
    const tags = ['best', 'chef', 'client', 'commercial', 'fail', 'rage', 'stagiaire', 'win', 'wtf'];
    const responses = [];
    for (const tag of tags) {
      responses.push(of(posts[tag]));
    }
    return forkJoin(responses).map((result) => {
      const allPosts = [].concat(...result);
      return this.randomPost(allPosts);
    })
    .delay(500);
  }

  randomPost(posts, min = 0, max = posts.length - 1) { // min and max included
    const index = Math.floor(Math.random() * (max - min + 1) + min);
    const post = posts[index];
    if (this.randomPosts.length === posts.length) {
      this.randomPosts = [];
    }
    if (this.randomPosts.find((p) => p.id === post.id)) {
      return this.randomPost(posts, min, max);
    } else {
      this.randomPosts.push(post);
      return post;
    }
  }
}
