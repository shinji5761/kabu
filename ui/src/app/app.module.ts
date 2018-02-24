import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

// Add Module
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ViewPage } from '../pages/view/view';
import { ViewConfigPage } from '../pages/view-config/view-config';


// Provideres
import { ViewConfigProvider } from '../providers/view-config/view-config';


// GoogleChart
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ApiAccessorProvider } from '../providers/api-accessor/api-accessor';


@NgModule({
  declarations: [
      MyApp
    , HomePage
    , ViewPage
    , ViewConfigPage
  ],
  imports: [
      BrowserModule
    , HttpClientModule
    , IonicModule.forRoot(MyApp)
    , IonicStorageModule.forRoot(
        {'name' : 'mydb', 'driverOrder' : ['indexddb', 'sqlite', 'websql']}
    )
    , Ng2GoogleChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp
    , HomePage
    , ViewPage
    , ViewConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ViewConfigProvider,
    SQLite,
    ApiAccessorProvider
  ],
  schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
