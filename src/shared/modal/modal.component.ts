import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'modal.html'
})
export class ModalComponent {

  msg;
  constructor(private params: NavParams) {
    this.msg = this.params.get('msg');
  }
}
