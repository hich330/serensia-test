import { Routes } from '@angular/router';
import {TermSuggestionComponent} from "./term-suggestion/term-suggestion.component";
import {SirenValidityComponent} from "./siren-validity/siren-validity.component";
import {MailWebCrawlerComponent} from "./mail-web-crawler/mail-web-crawler.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'term-suggestion', component: TermSuggestionComponent },
  { path: 'siren-validity', component: SirenValidityComponent },
  { path: 'crawler', component: MailWebCrawlerComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
