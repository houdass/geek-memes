import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { Subject } from 'rxjs/Subject';
import { Page } from '../shared/page.model';
import { RandomPage } from '../pages/random/random';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { timer } from 'rxjs/observable/timer';
import { NetworkService } from '../services/network.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  activePage = new Subject();

  rootPage: any = RandomPage;

  pages: Array<Page>;

  showSplash = true;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private admob: AdMobFree,
              private networkService: NetworkService) {
    this.initializeApp();

    // used for navigation
    this.pages = [
      new Page('Mes Favoris', ListPage, 'yh-star', false),
      new Page('Random', RandomPage, 'yh-random', true),
      new Page('Best of', ListPage, 'yh-best-of', false, 'best'),
      new Page('Rage', ListPage, 'yh-rage', false, 'best'),
      new Page('Win', ListPage, 'yh-win', false, 'Win'),
      new Page('Fail', ListPage, 'yh-fail', false, 'Fail'),
      new Page('WTF', ListPage, 'yh-wtf', false, 'wtf'),
      new Page('Stagiaire', ListPage, 'yh-trainee', false, 'stagiaire'),
      new Page('Client', ListPage, 'yh-client', false, 'client'),
      new Page('Commercial', ListPage, 'yh-commercial', false, 'commercial'),
      new Page('Chef', ListPage, 'yh-boss', false, 'chef')
    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => {
        this.showSplash = false;
        this.showBanner();
        this.launchInterstitial();
      });
    });
  }

  showBanner() {
    let bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      id: 'ca-app-pub-5938331216552191/5437743958'
    };

    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
      // success
    }).catch(e => console.log(e));
  }

  launchInterstitial() {
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      autoShow: true,
      id: 'ca-app-pub-5938331216552191/9157497110'
    };
    this.admob.interstitial.config(interstitialConfig);
    this.admob.interstitial.prepare().then(() => {});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (this.networkService.checkNetwork()) {
      this.nav.setRoot(page.component, {page});
      this.activePage.next(page);
    }
  }
}
