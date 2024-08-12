import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { AppIntializerService } from '@core/index';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(TranslateModule.forRoot({})),
    {
      provide: APP_INITIALIZER,
      useFactory: (appIntialize: AppIntializerService) => () => {
        return appIntialize.initialize();
      },
      deps: [AppIntializerService],
      multi: true,
    },
  ],
};
