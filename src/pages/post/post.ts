import {Component, EventEmitter, Input, Output} from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'yh-post',
  templateUrl: 'post.html',
})
export class PostComponent {

  @Input() post;
  @Input() canReload;
  @Output() reloadEvent = new EventEmitter();

  constructor(private storageService: StorageService) {}

  favoritePost(post) {
    this.storageService.favoritePost(post).then(() => {
      post.isFavorite = true;
    });
  }

  unfavoritePost(post) {
    this.storageService.unfavoritePost(post).then(() => {
      post.isFavorite = false;
    });
  }

  reload() {
    this.reloadEvent.emit();
  }
}
