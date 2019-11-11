import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { StorageService } from '../../services/storage.service';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'yh-post',
  templateUrl: 'post.component.html',
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
  @Input() reload;
  @Output() reloadEvent = new EventEmitter();
  @Output() postDeleteChanged = new EventEmitter();
  // fileTransfer: FileTransferObject;
  showDots = false;
  @Input() isFavoritePage;

  constructor(private storageService: StorageService,
              // private transfer: FileTransfer,
              // private file: File,
              private socialSharing: SocialSharing,
              public platform: Platform) {
    /* this.platform.ready().then(() => {
      this.fileTransfer = this.transfer.create();
      this.fileTransfer.onProgress((progressEvent) => {
        console.log(progressEvent.loaded);
      });
    }); */
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
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

  deletePost(post) {
    this.storageService.unfavoritePost(post).then(() => {
      post.isFavorite = false;
      this.postDeleteChanged.emit();
    });
  }

  download(post) {
    /* this.fileTransfer.download(post.image, this.file.externalApplicationStorageDirectory + post.image.split('/').pop()).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.file.copyFile(this.file.dataDirectory,  post.image.split('/').pop(), this.file.dataDirectory, post.image.split('/').pop()).then(() => {
        console.log('Copied!', this.file.externalApplicationStorageDirectory);
      })
    }, (error) => {
      console.log(error);
    }); */
  }

  refresh() {
      this.reload.isReloading = true;
      this.reloadEvent.emit();
  }

  share(post) {
    this.socialSharing.share(post.description, 'La joie du code', null, post.image);
  }
}
