import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { PostComponent } from '../shared/post/post.component';
import { ModalComponent } from '../shared/modal/modal.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StorageService } from '../services/storage.service';
import { NetworkService } from '../services/network.service';

// import { FileTransfer } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { AdMobFree } from '@ionic-native/admob-free';
import {PageService} from "../services/page.service";
import {RandomPage} from "../pages/random/random";

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    RandomPage,
    PostComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    RandomPage,
    ModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    NetworkService,
    // File,
    // FileTransfer,
    Network,
    SocialSharing,
    PageService,
    AdMobFree,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
