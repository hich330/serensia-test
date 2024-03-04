import {WebBrowser} from "../web-browser/web-browser";

export abstract class EmailParser {
  abstract getEmailsInPageAndChildPages(browser: WebBrowser, url: string, maximumDepth?: number): Promise<string[]>;
}
