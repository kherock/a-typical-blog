import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppModule } from './AppModule';
import { AppRoot } from './app-root';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TransferHttpCacheModule,

    AppModule,    
  ],
  providers: [],
  bootstrap: [AppRoot],
})
export class AppBrowserModule { }
