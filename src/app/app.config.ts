import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {TermSuggestion} from "./term-suggestion/services/term-suggestion";
import {TermSuggestionImpl} from "./term-suggestion/services/term-suggestion.impl";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
  ]
};
