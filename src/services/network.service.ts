import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ModalController } from 'ionic-angular';
import { ModalComponent } from '../shared/modal/modal.component';
// import { Subject } from 'rxjs/Subject';

@Injectable()
export class NetworkService {

  // isOnlineEvent = new Subject();

  constructor(private network: Network, private modalCtrl: ModalController) {
    let modal = this.modalCtrl.create(ModalComponent, { msg: 'Aucune connexion internet !'});
    if (this.network.type === 'none') {
      modal.present();
    }
    this.network.onDisconnect().subscribe(() => {
      modal.present();
    });
  }

  checkNetwork() {
    if (this.network.type === 'none') {
      let modal = this.modalCtrl.create(ModalComponent, { msg: 'Aucune connexion internet ! '});
      modal.present();
    }
    return this.network.type !== 'none';
  }
}
