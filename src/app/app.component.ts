import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string, tag: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Best of', component: ListPage, icon: 'yh-best-of', tag: 'best' },
      { title: 'Random', component: HomePage, icon: 'yh-random', tag: 'bestof' },
      { title: 'Rage', component: ListPage, icon: 'yh-rage', tag: 'rage' },
      { title: 'Win', component: ListPage, icon: 'yh-win', tag: 'win'  },
      { title: 'Fail', component: ListPage, icon: 'yh-fail', tag: 'fail' },
      { title: 'WTF', component: ListPage, icon: 'yh-wtf', tag: 'wtf' },
      { title: 'Stagiaire', component: ListPage, icon: 'yh-trainee', tag: 'stagiaire' },
      { title: 'Client', component: ListPage, icon: 'yh-client', tag: 'client'  },
      { title: 'Commercial', component: ListPage, icon: 'yh-commercial', tag: 'commercial' },
      { title: 'Chef', component: ListPage, icon: 'yh-boss', tag: 'chef' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, { page });
  }
}
