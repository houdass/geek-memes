import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../services/app.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-random',
  templateUrl: 'random.html'
})
export class RandomPage {
  post = {};
  reload = { isReloading: false };

  constructor(public navCtrl: NavController, private appService: AppService) {}

  ionViewDidLoad() {
    this.refresh()
  }

  refresh() {
    this.appService.scrapRandom().subscribe((post) => {
      this.post = post;
      this.reload.isReloading = false;
    })
  }
}
