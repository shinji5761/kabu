import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ViewChild } from '@angular/core';

import { NavController, MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ViewPage } from '../pages/view/view';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    /** 初期表示ページ */
    rootPage:any = ViewPage;

    /** ページ */
    menuList : any = [
          {'label' : 'Home', 'page' : HomePage}
        , {'label' : 'View', 'page' : ViewPage}
    ];

    /**  */
    @ViewChild('contents') nav : NavController;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl : MenuController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    private changePage(page : any) : void {
        // this.nav.push(page);
        this.rootPage = page;
        this.menuCtrl.close();
    }

}

