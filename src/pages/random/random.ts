import { Component } from '@angular/core';
import {PageService} from "../../services/page.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-random',
  templateUrl: 'random.html'
})
export class RandomPage {
  post = {};
  reload = { isReloading: false };

  constructor(private pageService: PageService) {}

  ionViewDidLoad() {
    this.refresh()
  }

  refresh() {
    this.pageService.getRandom().subscribe((post) => {
      this.post = post;
      this.reload.isReloading = false;
    })
  }
}
