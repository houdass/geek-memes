import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'yh-post',
  templateUrl: 'post.html',
  animations: [
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('* => *', animate('.5s'))
    ])
  ]
})
export class PostComponent {

  @Input() post;
  @Input() canReload;
  @Input() isReloading;
  @Output() reloadEvent = new EventEmitter();
  showDots = false;

  constructor(private storageService: StorageService) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    debugger
    if (simpleChanges.post) {
      this.storageService.isFavorite(this.post).then((isFavorite) => {
        this.post.isFavorite = isFavorite;
      });
    }
  }

  visibility(state) {
    return state ? 'visible' : 'invisible';
  }

  favoritePost(post) {
    this.showDots = true;
    this.storageService.favoritePost(post).then(() => {
      post.isFavorite = true;
      this.showDots = false;
    });
  }

  unfavoritePost(post) {
    this.showDots = true;
    this.storageService.unfavoritePost(post).then(() => {
      this.showDots = false;
      post.isFavorite = false;
    });
  }

  download(post) {}

  reload() {
    this.isReloading = true;
    this.reloadEvent.emit();
  }
}
