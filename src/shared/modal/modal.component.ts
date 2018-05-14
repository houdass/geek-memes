import { AfterViewInit, Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'hello-world',
  templateUrl: 'modal.html'
})
export class ModalComponent implements AfterViewInit {

  character;
  msg;
  constructor(public navCtrl: NavController,
              private params: NavParams,
              private viewCtrl: ViewController,
              private network: Network) {}

  ngAfterViewInit() {
    this.msg = this.params.get('msg');
    this.network.onConnect().subscribe(() => {
      this.isOnline = true;
    });
    this.network.onDisconnect().subscribe(() => {
      this.isOnline = false;
    });
  }

  dismiss() {
    this.navCtrl.push(MyApp);
    this.viewCtrl.dismiss();
  }
}
