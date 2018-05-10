import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'yh-post',
  templateUrl: 'post.html',
})
export class PostComponent {

  @Input() post;
  @Input() canReload;
  @Output() reloadEvent = new EventEmitter();
  fileTransfer: FileTransferObject;

  constructor(private storageService: StorageService,
              private transfer: FileTransfer,
              private file: File) {
    this.fileTransfer = this.transfer.create();
  }

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

  download(post) {
    debugger
    this.fileTransfer.download(post.image, this.file.dataDirectory + 'GeekMemes/filegeekmemes.gif', true).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

  reload() {
    this.reloadEvent.emit();
  }
}
