import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { SERVER_URL } from './app/AppServerModule';

//https://github.com/angular/material2/issues/10715
MatFormField.prototype.updateOutlineGap = function() { };

enableProdMode();

export { AppServerModule } from './app/AppServerModule';


export function ngViewEngine(module, moduleMap, serverUrl) {
  const engine = ngExpressEngine({
    bootstrap: module,
    providers: [
      provideModuleMap(moduleMap),
      {
        provide: SERVER_URL,
        useValue: serverUrl,
      },
    ]
  });
  return (filePath, options, callback?) => {
    let promise;
    if (typeof callback !== 'function') {
      promise = new Promise((resolve, reject) => {
        callback = (err, html) => err ? reject(err) : resolve(html);
      })
    }
    engine(filePath, options, callback);
    return promise;
  }
}
