import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';

@Injectable()
export class NetworkService {

  constructor(private network: Network, private alertCtrl: AlertController) {
    debugger
    let alert = this.alertCtrl.create({
      title: 'Vous avez été déconnecté, veuillez vérifier votre connexion internet et réessayer',
      buttons: ['Ok']
    });
    if (this.network.type === 'none') {
      alert.present();
    }
    this.network.onDisconnect().subscribe(() => {
      alert.present();
    });
  }

  checkNetwork() {
    if (this.network.type === 'none') {
      let alert = this.alertCtrl.create({
        title: 'Aucune connexion internet',
        subTitle: 'Vous êtes déconnecté, veuillez vérifier votre connexion internet et réessayer',
        buttons: ['Ok']
      });
      alert.present();
    }
    return this.network.type !== 'none';
  }
}
