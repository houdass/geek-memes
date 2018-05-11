import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  fileTransfer: FileTransferObject;
  showDots = false;

  constructor(private storageService: StorageService,
              private transfer: FileTransfer,
              private file: File) {
    this.fileTransfer = this.transfer.create();
  }

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

  download(post) {
    debugger
    this.fileTransfer.download(post.image, this.file.dataDirectory + 'GeekMemes/filegeekmemes.gif', true).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

  reload() {
    this.isReloading = true;
    this.reloadEvent.emit();
  }
}
