import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(),
    provideHotToastConfig({ style: {marginTop:'70px'}, stacking:'depth', duration: 2000}),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue:{
        appearance:'fill'
      }
    },
  ]
};
