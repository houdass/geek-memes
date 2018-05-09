import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'favoriteFilms';

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {}

  isFavorite(postImg) {
    return this.getAllFavoritePosts().then(result => {
      return result && result.indexOf(postImg) !== -1;
    });
  }

  favoritePost(postImg) {
    return this.getAllFavoritePosts().then(result => {
      if (result) {
        result.push(postImg);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [postImg]);
      }
    });
  }

  unfavoritePost(postImg) {
    return this.getAllFavoritePosts().then(result => {
      if (result) {
        const index = result.indexOf(postImg);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

  getAllFavoritePosts() {
    return this.storage.get(STORAGE_KEY);
  }
}
