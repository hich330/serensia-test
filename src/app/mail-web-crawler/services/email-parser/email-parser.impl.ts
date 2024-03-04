import {WebBrowser} from "../web-browser/web-browser";
import {EmailParser} from "./email-parser";

export class EmailParserImpl implements EmailParser {

  async getEmailsInPageAndChildPages(browser: WebBrowser, url: string, maximumDepth: number = -1) {
    const pagesList: string[] = [];
    const emailList = new Set<string>();
    try {
      const _parsedUrl = new URL(url).href;
      await this.extractEmails(emailList, pagesList, browser, _parsedUrl, maximumDepth);
    } catch (error) {
      return Promise.reject('invalid URL');
    }
    return Array.from(emailList);
  }

  private async extractEmails(
    emailList: Set<string>,
    pagesList: string[],
    browser: WebBrowser,
    url: string,
    maximumDepth: number = -1,
    currentDepth: number = 0
  )  {
    if(!pagesList.includes(url)) {
      const allHrefRegex = new RegExp(/(?<=href=)(:?"|'|)(?![tel:|javascript:|#])[\:\/\w@\.-]*(:?"|'|)/gi);
      const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi);
      const mailtoRegex = new RegExp(/mailto:/gi);
      const html = browser.getHtml(url);

      if (html) {
        pagesList.push(url);
        const match = html.match(allHrefRegex) || [];
        for(let href of match) {
          const _cleanHref = href.replace(/["|']/gi, '');
          if (_cleanHref) {
            if (mailtoRegex.test(_cleanHref)) {
              const _email = _cleanHref.replace(mailtoRegex, '');
              if (emailRegex.test(_email)) {
                emailList.add(_cleanHref.replace(mailtoRegex, ''));
              }
            } else if(maximumDepth === -1 || currentDepth < maximumDepth) {
              try {
                const _parsedUrl = new URL(_cleanHref, url).href;
                await this.extractEmails(emailList, pagesList, browser, _parsedUrl, maximumDepth, currentDepth+1);
              } catch (error) {
                return;
              }
            }
          }
        }
      }
    }
  }

}
