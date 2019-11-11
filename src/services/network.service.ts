import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ModalController } from 'ionic-angular';
import { ModalComponent } from '../shared/modal/modal.component';
import {Subject} from "rxjs/Subject";

@Injectable()
export class NetworkService {

  msg = `Vous êtes hors ligne, veuillez vérifier votre connexion internet et réessayer, une fois en ligne l'application s'activera automatiquement.`
  modal;
  randomPageEvent = new Subject();
  constructor(private network: Network,
              private modalCtrl: ModalController) {}

  checkNetwork() {
    this.modal = this.modalCtrl.create(ModalComponent, { msg: this.msg });
    if (this.network.type === 'none') {
      this.modal.present();
    };

    this.network.onDisconnect().subscribe(() => {
      this.modal.present();
    });

    this.network.onConnect().subscribe(() => {
      this.modal.dismiss();
      this.randomPageEvent.next();
    });
  }
}
