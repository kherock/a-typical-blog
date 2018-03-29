import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { UniversalInterceptor } from './core/UniversalInterceptor';
import { AppModule } from './AppModule';
import { AppRoot } from './app-root';

export const SERVER_URL = new InjectionToken<string>('ServerUrl');

@NgModule({
  imports: [
    NoopAnimationsModule,
    ModuleMapLoaderModule,
    ServerModule,
    ServerTransferStateModule,

    AppModule,    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true,
  }],
  bootstrap: [AppRoot],
})
export class AppServerModule { }
