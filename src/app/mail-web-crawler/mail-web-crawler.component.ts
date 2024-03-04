import {Component} from '@angular/core';
import {WebBrowser} from "./services/web-browser/web-browser";
import {WebBrowserImpl} from "./services/web-browser/web-browser.impl";
import {EmailParser} from "./services/email-parser/email-parser";
import {EmailParserImpl} from "./services/email-parser/email-parser.impl";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListModule,} from "@angular/material/list";

@Component({
  selector: 'app-mail-web-crawler',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatList,
    MatListModule
  ],
  providers: [
    { provide: WebBrowser, useClass: WebBrowserImpl },
    { provide: EmailParser, useClass: EmailParserImpl },
  ],
  templateUrl: './mail-web-crawler.component.html',
  styleUrl: './mail-web-crawler.component.scss'
})
export class MailWebCrawlerComponent {
  url = new FormControl<string>('file:///C:/TestHtml/index.html');
  depth = new FormControl<number>(2);
  emails: string[] = [];

  constructor(
    private emailParser: EmailParser,
    private wb: WebBrowser,
  ) {}

  async extractEmails() {
    if (this.url.value) {
      this.emails = await this.emailParser.getEmailsInPageAndChildPages(
        this.wb,
        this.url.value,
        this.depth.value !== null ? this.depth.value : undefined
      );
    }
  }
}
