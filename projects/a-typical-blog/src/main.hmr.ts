import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/AppModule';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (module['hot']) {
  let ngModule: NgModuleRef<any>;
  module['hot'].accept();
  platformBrowserDynamic().bootstrapModule(AppModule).then(mod => ngModule = mod);
  module['hot'].dispose(() => {
  const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
} else {
  console.error('HMR is not enabled for webpack-dev-server!');
  console.log('Are you using the --hmr flag for ng serve?');
}
