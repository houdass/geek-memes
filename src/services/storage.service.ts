import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { find, findIndex } from 'lodash';

const STORAGE_KEY = 'Trance';

@Injectable()
export class StorageService {

  isComplete = false;

  constructor(private storage: Storage) {}

  isFavorite(post) {
    return this.getAllFavoritePosts().then(posts => {
     return !!(posts && find(posts, { image : post.image }));
    });
  }

  favoritePost(post) {
    return this.getAllFavoritePosts().then(posts => {
      post.isFavorite = true;
      if (posts) {
        posts.push(post);
        return this.storage.set(STORAGE_KEY, posts);
      } else {
        return this.storage.set(STORAGE_KEY, [post]);
      }
    });
  }

  unfavoritePost(post) {
    return this.getAllFavoritePosts().then(posts => {
      if (posts) {
        const index = findIndex(posts, ['image', post.image]);
        posts.splice(index, 1);
        return this.storage.set(STORAGE_KEY, posts);
      }
    });
  }

  getAllFavoritePosts() {
    return this.storage.get(STORAGE_KEY);
  }

  paginate(posts, page = 1) {
    const offset = (page - 1) * 4;
    if (offset + 4 > posts.length) {
      this.isComplete = true;
    }
    return posts.slice(offset, offset + 4);
  }
}
